import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecommendedAuctions = ({ currentProductId }) => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/products/all"); // Ideally you'd filter these
        const filtered = res.data.products.filter(p => p._id !== currentProductId);
        setRecommended(filtered.slice(0, 5)); // show top 5
      } catch (err) {
        console.error("Error fetching recommended auctions", err);
      }
    };
    fetchRecommended();
  }, [currentProductId]);

  if (recommended.length === 0) return null;

  return (
    <div className="py-4">
      <h3 className="text-4xl mt-8 text-center font-extrabold mb-4 text-primary"> Recommended Auctions</h3>
      <div className="flex py-4 px-10 space-x-6 overflow-x-auto scrollbar-hide">
        {recommended.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="min-w-[250px] bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={`http://localhost:4001/uploads/${product.image}`}
              alt={product.title}
              className="h-48 w-full object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h4 className="font-semibold text-lg text-gray-800">{product.title}</h4>
              <p className="text-sm text-gray-500 truncate">{product.description}</p>
              <p className="text-indigo-600 mt-2 font-medium">Start ₹{product.startPrice}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* View All Button */}
      <div className="text-center mt-6">
        <Link
          to="/products"
          className="text-white bg-primary hover:bg-blue-950 py-3 px-8 rounded-lg transition duration-300"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default RecommendedAuctions;
