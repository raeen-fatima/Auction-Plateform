import { motion } from "framer-motion";
import { FaGavel, FaStar, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const recommendedAuctions = [
  { id: 1, name: "Luxury Sports Car", price: "$150,000", time: "02:30:15", image: "https://wallpapercrafter.com/desktop/40365-McLaren-P1-supercar-McLaren-luxury-cars-sports-car-hybrid-P1-GTR-concept-review.jpg" },
  { id: 2, name: "Antique Gold Watch", price: "$3,500", time: "00:45:10", image: "https://a.1stdibscdn.com/vintage-18-karat-gold-omega-seamaster-deville-bracelet-watch-for-sale/1121189/j_73111811566632176744/7311181_master.jpg" },
  { id: 3, name: "Vintage Painting", price: "$7,200", time: "04:15:20", image: "https://www.regentantiques.com/product_images/07602-Antique-Oil--Painting-Tavern-Scene-C.Costa-C1880-1.jpg" },
];

export default function RecommendedAuctions() {
  const navigate = useNavigate();

  return (
    <div className="p-6 mt-10">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedAuctions.map((auction) => (
          <motion.div
            key={auction.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300"
          >
            <img src={auction.image} alt={auction.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <FaGavel className="mr-2 text-blue-500" /> {auction.name}
              </h3>
              <p className="text-gray-600 mt-1 flex items-center">
                <FaClock className="mr-2 text-red-500" /> {auction.time} left
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-green-600">{auction.price}</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                  Bid Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/live-auctions")}
          className="px-6 py-3 bg-blue-700 text-white text-lg font-semibold rounded-lg hover:bg-blue-800 transition-all"
        >
          View More Auctions
        </motion.button>
      </div>
    </div>
  );
}
