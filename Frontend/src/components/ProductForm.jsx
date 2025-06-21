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

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/products/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product Created Successfully 🎉");
      console.log(res.data);

      // Reset form
      setFormData({
        title: "",
        description: "",
        startPrice: "",
        startTime: "",
        endTime: "",
        image: null,
      });
      setImagePreview(null);

    } catch (err) {
      console.error("Error creating product", err);
      toast.error("Failed to create product 😢");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="py-24 min-h-screen">
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
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="number"
              name="startPrice"
              placeholder="Start Price (₹)"
              value={formData.startPrice}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            required
            rows="4"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 transition"
            required
          />

          {imagePreview && (
            <div className="text-center mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-60 h-60 object-cover rounded-xl border shadow-lg mx-auto"
              />
            </div>
          )}

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
