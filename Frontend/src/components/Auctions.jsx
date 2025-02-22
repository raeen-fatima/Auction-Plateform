import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Vehicles" },
    { id: 3, name: "Furniture" },
    { id: 4, name: "Collectibles" },
    { id: 5, name: "Watches" },
    { id: 6, name: "Jewelry" }
  ];
  
  const products = [
    { id: 1, name: "iPhone 14 Pro", category: "Electronics", price: "$1200", image: "https://tse3.mm.bing.net/th?id=OIP.0vG8_FUIhejk5KJNExa-ZgHaHa&pid=Api&P=0&h=180" },
    { id: 2, name: "Tesla Model 3", category: "Vehicles", price: "$35,000", image: "https://tse4.mm.bing.net/th?id=OIP.o5D84SF2bzz0UhdFi46RFQHaEK&pid=Api&P=0&h=180" },
    { id: 3, name: "Antique Vase", category: "Collectibles", price: "$500", image: "https://tse1.mm.bing.net/th?id=OIP.nevpM65bv_mCocdmFFubgQHaGb&pid=Api&P=0&h=180" },
    { id: 4, name: "Leather Sofa", category: "Furniture", price: "$800", image: "https://sp.yimg.com/ib/th?id=OPAC.8dNMfIpGFKbvNQ474C474&o=5&pid=21.1&w=160&h=105" },
    { id: 5, name: "Rolex Submariner", category: "Watches", price: "$9,000", image: "https://tse1.mm.bing.net/th?id=OIP.LwHfu8Twp3F7PAGk5K2o1gHaHa&pid=Api&P=0&h=180" },
    { id: 6, name: "Diamond Necklace", category: "Jewelry", price: "$25,000", image: "https://tse4.mm.bing.net/th?id=OIP.8eWlJPaNwU4D9He7zZ3qRgHaHa&pid=Api&P=0&h=180" },
    { id: 7, name: "Gaming Laptop", category: "Electronics", price: "$1,800", image: "https://tse2.mm.bing.net/th?id=OIP.oF_cDzXsClKJgxL2z0VpKQHaHa&pid=Api&P=0&h=180" },
    { id: 8, name: "Harley Davidson", category: "Vehicles", price: "$20,000", image: "https://tse3.mm.bing.net/th?id=OIP.vJ9sJhJFdUO7EHi_ZlgIdQHaFj&pid=Api&P=0&h=180" },
    { id: 9, name: "Samsung Galaxy S23", category: "Electronics", price: "$999", image: "https://tse4.mm.bing.net/th?id=OIP.yWmE2M9uoF5J_Rb7yXXfVgHaHa&pid=Api&P=0&h=180" },
    { id: 10, name: "BMW X5", category: "Vehicles", price: "$60,000", image: "https://tse2.mm.bing.net/th?id=OIP.YoHV59Xn0U8ChzQoGho2KAHaE7&pid=Api&P=0&h=180" },
    { id: 11, name: "MacBook Pro", category: "Electronics", price: "$2,000", image: "https://tse4.mm.bing.net/th?id=OIP.abc123&pid=Api&P=0&h=180" },
    { id: 12, name: "Yamaha R1", category: "Vehicles", price: "$18,000", image: "https://tse4.mm.bing.net/th?id=OIP.def456&pid=Api&P=0&h=180" },
    { id: 13, name: "Modern Dining Table", category: "Furniture", price: "$1,500", image: "https://tse4.mm.bing.net/th?id=OIP.ghi789&pid=Api&P=0&h=180" },
    { id: 14, name: "Vintage Clock", category: "Collectibles", price: "$700", image: "https://tse4.mm.bing.net/th?id=OIP.jkl012&pid=Api&P=0&h=180" },
    { id: 15, name: "Omega Speedmaster", category: "Watches", price: "$6,500", image: "https://tse4.mm.bing.net/th?id=OIP.mno345&pid=Api&P=0&h=180" },
    { id: 16, name: "Gold Bracelet", category: "Jewelry", price: "$3,200", image: "https://tse4.mm.bing.net/th?id=OIP.pqr678&pid=Api&P=0&h=180" }
  ];
const Auctions = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <>
    <Navbar />
    <section className="py-20 bg-gray-50 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-gray-900 mb-10">
        Auctions
      </motion.h2>
      
      {/* Category Selection */}
      <div className="flex justify-center space-x-4 mb-10">
        <button onClick={() => setSelectedCategory("All")} className={`px-6 py-3 rounded-xl shadow-md transition-all ${selectedCategory === "All" ? "bg-primary text-white" : "bg-white border border-gray-300 hover:bg-gray-100"}`}>All</button>
        {categories.map((category) => (
          <button key={category.id} onClick={() => setSelectedCategory(category.name)} className={`px-6 py-3 rounded-xl shadow-md transition-all ${selectedCategory === category.name ? "bg-primary text-white" : "bg-white border border-gray-300 hover:bg-gray-100"}`}>{category.name}</button>
        ))}
      </div>
      
      {/* Product Listing */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
          <motion.div key={product.id} 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all">
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-500 text-sm">Category: {product.category}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-primary font-bold text-lg">{product.price}</p>
              <button className="px-5 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-blue-950 transition-all">Buy Now</button>
            </div>
          </motion.div>
        )) : (
          <p className="text-gray-600 col-span-full">No products available in this category.</p>
        )}
      </div>
    </section>
    <Footer />
    </>

  );
};

export default Auctions;
