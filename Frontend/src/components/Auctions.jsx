import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Auctions = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch("https://api.example.com/categories");
        const productResponse = await fetch("https://api.example.com/products");
        
        const categoryData = await categoryResponse.json();
        const productData = await productResponse.json();

        setCategories(categoryData);
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          className="text-5xl font-extrabold text-primary mb-10">
          Auctions
        </motion.h2>

        {loading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : (
          <>
            {/* Category Selection */}
            <div className="flex justify-center space-x-4 mb-10">
              <button onClick={() => setSelectedCategory("All")} 
                className={`px-6 py-3 rounded-xl shadow-md transition-all ${selectedCategory === "All" ? "bg-primary text-white" : "bg-white border border-gray-300 hover:bg-gray-100"}`}>All</button>
              {categories.map((category) => (
                <button key={category.id} onClick={() => setSelectedCategory(category.name)} 
                  className={`px-6 py-3 rounded-xl shadow-md transition-all ${selectedCategory === category.name ? "bg-primary text-white" : "bg-white border border-gray-300 hover:bg-gray-100"}`}>{category.name}</button>
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
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Auctions;
