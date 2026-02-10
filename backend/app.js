require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const upload = require("./middleware/upload");
const { Parser } = require("json2csv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2; 
const app = express();
const PORT = process.env.PORT || 5000;
const User = require("./models/User");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/users", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .collation({ locale: "en", strength: 2 })
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await User.countDocuments();

    res.status(200).json({
      users,
      hasMore: skip + users.length < total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/users", upload.single("profile"), async (req, res) => {
  try {
    const { name, email, gender } = req.body;

    const user = await User.create({
      name,
      email,
      gender,
      profile: req.file ? req.file.path : ""
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Change app.put to include the upload middleware
app.put("/users", upload.single("profile"), async (req, res) => {
  try {
    const { _id, name, email, gender, status } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "User ID (_id) is required" });
    }

    const updates = { name, email, gender, status };

    if (req.file) {
      updates.profile = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      updates,
      { returnDocument: "after", runValidators: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/users", async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "User ID (_id) is required" });
    }

    const deletedUser = await User.findByIdAndDelete(_id).lean();

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      const users = await User.find().sort({ name: 1 }).lean();
      return res.status(200).json(users);
    }

    const searchRegex = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters

    // 1. Find matches where Name OR Email START with the search term (Priority)
    const startsWith = await User.find({
      $or: [
        { name: { $regex: `^${searchRegex}`, $options: "i" } },
        { email: { $regex: `^${searchRegex}`, $options: "i" } }
      ]
    }).lean();

    // 2. Find matches that CONTAIN the search term in Name OR Email but DON'T start with it
    const startsWithIds = startsWith.map(user => user._id);
    
    const contains = await User.find({
      $and: [
        { _id: { $nin: startsWithIds } }, // Exclude ones already found in 'startsWith'
        {
          $or: [
            { name: { $regex: searchRegex, $options: "i" } },
            { email: { $regex: searchRegex, $options: "i" } }
          ]
        }
      ]
    }).lean();

    // 3. Combine them: StartsWith comes first
    const results = [...startsWith, ...contains];

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Invalid user ID" });
  }
});


app.get("/users/export/csv", async (req, res) => {
  try {
    const { q } = req.query;
    let query = {};
    if (q) {
      query = {
        $or: [
          { name: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } }
        ]
      };
    }

    const users = await User.find(query)
      .select("name email gender status createdAt")
      .sort({ name: 1 })
      .lean();

    if (!users.length) {
      return res.status(404).json({ message: "No users found to export" });
    }

    const fields = ["name", "email", "gender", "status", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    res.header("Content-Type", "text/csv");
    res.header("Content-Disposition", `attachment; filename=users_export.csv`);
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});

