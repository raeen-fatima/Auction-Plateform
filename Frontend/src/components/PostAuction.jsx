import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import Navbar from "./Nav2";
import Footer from "./Footer";

const PostAuction = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingBid: "",
    imageFile: null,
    duration: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Auction Posted:", formData);
    alert("Auction Posted Successfully!");
    setFormData({ title: "", description: "", startingBid: "", imageFile: null, duration: "" });
  };

  return (
    <>
      <Navbar />
      <div className="flex  justify-center items-center min-h-screen bg-gray-100 py-28">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Post a New Auction</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name="title" 
              placeholder="Auction Title" 
              value={formData.title} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md" 
              required
            />
            <textarea
              name="description"
              placeholder="Auction Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            ></textarea>
            <input 
              type="number" 
              name="startingBid" 
              placeholder="Starting Bid ($)" 
              value={formData.startingBid} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md" 
              required
            />
            <input 
              type="file" 
              accept=".jpg, .jpeg, .png, .pdf" 
              onChange={handleFileChange} 
              className="w-full p-2 border rounded-md" 
              required
            />
            <input 
              type="number" 
              name="duration" 
              placeholder="Duration (minutes)" 
              value={formData.duration} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md" 
              required
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-white p-2 rounded-md shadow-md hover:bg-blue-950"
            >
              <FaUpload /> Post Auction
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostAuction;
