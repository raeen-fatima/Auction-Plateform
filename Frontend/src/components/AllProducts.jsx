import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaGavel,
  FaClock,
  FaSearch,
  FaSortAmountDown,
  FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortByPrice, setSortByPrice] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/products/all");
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (search) {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      temp = temp.filter((p) => p.category === categoryFilter);
    }

    if (sortByPrice === "asc") {
      temp.sort((a, b) => a.startPrice - b.startPrice);
    } else if (sortByPrice === "desc") {
      temp.sort((a, b) => b.startPrice - a.startPrice);
    }

    setFilteredProducts(temp);
    setCurrentPage(1); // Reset to page 1 after filter change
  }, [search, sortByPrice, categoryFilter, products]);

  const getRemainingTime = (endTime) => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const diff = end - now;
    if (diff <= 0) return "Bidding Ended";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-16 py-24 bg-gray-50 min-h-screen">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-primary">
          Live Auctions
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimesCircle />
              </button>
            )}
          </div>

          {/* Filter Options */}
          <div className="flex items-center gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border px-4 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              onClick={() =>
                setSortByPrice((prev) =>
                  prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
                )
              }
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
            >
              <FaSortAmountDown />
              {sortByPrice === "asc"
                ? "Price: Low to High"
                : sortByPrice === "desc"
                ? "Price: High to Low"
                : "Sort by Price"}
            </button>
          </div>
        </div>

        {/* Product Cards */}
        {currentProducts.length === 0 ? (
          <div className="text-center text-black text-lg py-10">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => {
              const isEnded =
                getRemainingTime(product.endTime) === "Bidding Ended";

              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="cursor-pointer border rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="relative w-full h-52 overflow-hidden">
                    <img
                      src={`http://localhost:4001/uploads/${product.image}`}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-slate-200 bg-opacity-90 text-sm px-4 py-3 rounded-full shadow-md flex items-center gap-1">
                      <FaClock className="text-indigo-500" />
                      <span
                        className={`font-semibold ${
                          isEnded ? "text-red-600 " : "text-black"
                        }`}
                      >
                        {getRemainingTime(product.endTime)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h2 className="text-3xl font-bold text-primary">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-xl font-bold text-gray-700 px-2 py-1 rounded-full shadow-sm">
                        <span className="mr-1 text-black">Start Price:</span>
                        <span className="text-blue-700 font-bold ">
                          ₹{product.startPrice}
                        </span>
                      </div>

                      {!isEnded ? (
                        <button
                          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-all text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product._id}`);
                          }}
                        >
                          <FaGavel className="text-xs" /> Bid Now
                        </button>
                      ) : (
                        <button
                          className="flex items-center gap-2 px-3 py-1.5 border border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition rounded-lg shadow text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaBell className="text-xs" /> Notify Me
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-primary rounded-lg mx-2 disabled:bg-gray-300"
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 text-lg rounded-lg mx-2 ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-primary rounded-lg mx-2 disabled:bg-gray-300"
          >
            &gt;
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
