import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startPrice: "",
    startTime: "",
    endTime: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/products/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product Created Successfully 🎉");
      console.log(res.data);
    } catch (err) {
      console.error("Error creating product", err);
      toast.error("Error 😢");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="py-24  min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white border border-primary p-10 rounded-3xl shadow-xl space-y-6"
        >
          <h2 className="text-4xl font-extrabold text-center text-primary">Create New Auction</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="startPrice"
              placeholder="Start Price (₹)"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              required
            />

            <input
              type="datetime-local"
              name="startTime"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              required
            />

            <input
              type="datetime-local"
              name="endTime"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleChange}
            required
            rows="4"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full border border-gray-300 p-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 transition"
            onChange={handleImageChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold text-lg py-3 rounded-xl hover:bg-primary/90 transition duration-300"
          >
             Create Auction
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProductForm;
