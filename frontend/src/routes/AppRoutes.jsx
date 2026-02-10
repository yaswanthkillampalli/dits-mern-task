import { Routes, Route } from "react-router-dom";
import UsersList from "../pages/UsersList";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import ViewUser from "../pages/ViewUser";
import NotFound from "../pages/NotFound";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/users/add" element={<AddUser />} />
      <Route path="/users/edit/:id" element={<EditUser />} />
      <Route path="/users/view/:id" element={<ViewUser />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
