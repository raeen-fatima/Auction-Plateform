import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// ✅ Token ko automatic request ke sath bhejne ke liye:
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// 🔹 Signup Function
export const registerUser = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  localStorage.setItem("token", data.token);
  return data;
};

// 🔹 Login Function
export const loginUser = async (userData) => {
  const { data } = await API.post("/auth/login", userData);
  localStorage.setItem("token", data.token);
  return data;
};
