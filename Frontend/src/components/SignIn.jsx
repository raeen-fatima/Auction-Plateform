import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // Default to home if no "from" exists

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL
}/api/auth/login`, {
        email,
        password,
      });

      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful!");

      // Navigate to the previous page (from) or default to Dashboard
      navigate(from, { replace: true }); // 'replace' ensures that the login page won't be in the history stack
    } catch (error) {
      toast.error(
        "Login Failed: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="relative flex min-h-screen flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md relative">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>

          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-500 shadow-md"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Dont't Have an Account?{" "}
            <a href="/signUp" className="text-indigo-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
