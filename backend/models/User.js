const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },
    profile: {
      type: String 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
