import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../api/userApi";
import { toast } from "react-toastify";
import UserForm from "../components/users/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id)
      .then((res) => setUser(res.data))
      .catch(() => toast.error("Failed to load user"));
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      const formData = new FormData();
      
      formData.append("_id", data._id); 
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("status", data.status);

      if (data.profile && data.profile[0] instanceof File) {
        formData.append("profile", data.profile[0]);
      }

      await updateUser(formData);
      toast.success("User updated successfully!");
      navigate("/"); // Or wherever your list view is
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (!user) return <p className="text-center mt-4">Loading...</p>;

  return (
    <UserForm
      onSubmit={handleUpdate}
      defaultValues={user}
      isEdit
    />
  );
};

export default EditUser;
