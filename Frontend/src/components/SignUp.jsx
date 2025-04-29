import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("bidder"); // Default role
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/api/auth/register", {
        name,
        email,
        password,
        role
      });

      // Optional: Store token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message);
      navigate("/signIn");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email already registered! Please log in.");
      } else {
        toast.error("Error: " + (error.response?.data?.message || "Something went wrong!"));
      }
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="relative flex min-h-screen flex-col justify-center items-center py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md relative">
          {/* Close Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-gray-600 text-2xl font-bold cursor-pointer"
          >
            <RxCross2 />
          </button>

          <h2 className="text-center text-2xl font-bold text-gray-900">
            Sign Up to your account
          </h2>

          <form onSubmit={handleSignUp} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Enter Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Role</label>
              <select
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-gray-300"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="bidder">Bidder</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-500 shadow-md"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signIn" className="text-indigo-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
