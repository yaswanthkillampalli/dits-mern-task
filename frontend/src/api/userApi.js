import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

export const getUsers = (page = 1) => API.get(`/users?page=${page}`);
export const getUserById = (id) => API.get(`/users/${id}`);
export const createUser = (formData) => API.post("/users", formData);
export const updateUser = (formData) => API.put("/users", formData);
export const deleteUser = (id) => API.delete("/users", { data: { _id: id } });
export const searchUsers = (query) => API.get(`/users/search?q=${query}`);
export const exportUsersToCSV = (query) => API.get(`/users/export/csv?q=${encodeURIComponent(query)}`);