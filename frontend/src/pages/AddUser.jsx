import { useNavigate } from "react-router-dom";
import { createUser } from "../api/userApi";
import { toast } from "react-toastify";
import UserForm from "../components/users/UserForm";

const AddUser = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to go back?");
    if (confirmLeave) {
      navigate("/");
    }
  };
  const handleCreate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("status", data.status || "Active");

      if (data.profile && data.profile[0]) {
        formData.append("profile", data.profile[0]);
      }

      await createUser(formData);
      toast.success("User created successfully!");
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Full Error:", err.response?.data);
    }
  };


  return (
    <UserForm onSubmit={handleCreate} onCancel={handleCancel} />
  )
};

export default AddUser;
