// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:4001/api" });

// // ✅ Token ko automatic request ke sath bhejne ke liye:
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// // 🔹 Signup Function
// export const registerUser = async (userData) => {
//   const { data } = await API.post("/auth/register", userData);
//   localStorage.setItem("token", data.token);
//   return data;
// };

// // 🔹 Login Function
// export const loginUser = async (userData) => {
//   const { data } = await API.post("/auth/login", userData);
//   localStorage.setItem("token", data.token);
//   return data;
// };

// import axios from "axios";

// // This function gets the current authenticated user data
// const getUserData = async () => {
//   const token = localStorage.getItem("authToken"); // Get token from localStorage
//   if (!token) return;

//   try {
//     const response = await axios.get("http://localhost:4001/api/user/profile", {
//       headers: { Authorization: `Bearer ${token}` }, // Sending token with the request
//     });

//     return response.data; // User data
//   } catch (error) {
//     console.error("Error fetching user data", error);
//     return null;
//   }
// };
