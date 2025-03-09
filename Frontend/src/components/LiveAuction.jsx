// import { useState, useEffect } from "react";
// // import { io } from "socket.io-client";
// import { motion } from "framer-motion";
// import { FaDollarSign, FaGavel, FaClock } from "react-icons/fa";
// import Navbar from "./Nav2";
// import Footer from "./Footer";

// // Backend API & Socket.io Setup
// const API_URL = "https://fakestoreapi.com/products"; // 👈 Change this to your actual API
// // const socket = io("http://localhost:4001"); // 👈 Ensure backend is running

// const LiveAuction = () => {
//   const [bids, setBids] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(300);

//   useEffect(() => {
//     // Fetch auction products
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         console.log("Fetched Products:", data);

//         // Add starting bids if not present
//         const formattedData = data.map((item) => ({
//           id: item.id,
//           name: item.title || item.name, // Adjust based on API response
//           currentBid: item.startingBid || Math.floor(Math.random() * 1000) + 100,
//           image: item.image || "https://via.placeholder.com/150"
//         }));

//         setBids(formattedData);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();

//     // Listen for live bid updates
//     socket.on("bidUpdate", ({ auctionId, highestBid }) => {
//       setBids((prevBids) =>
//         prevBids.map((item) =>
//           item.id === auctionId ? { ...item, currentBid: highestBid } : item
//         )
//       );
//     });

//     return () => socket.off("bidUpdate");
//   }, []);

//   // Place bid function
//   const placeBid = (auctionId, currentBid) => {
//     const newBid = currentBid + 50;
//     socket.emit("placeBid", { auctionId, userId: "testUser", bidAmount: newBid });
//   };

//   const formatTime = (seconds) => {
//     const min = Math.floor(seconds / 60);
//     const sec = seconds % 60;
//     return `${min}:${sec < 10 ? "0" : ""}${sec}`;
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="py-28 text-center text-white">
//         <h2 className="text-5xl text-primary font-extrabold mb-6">Live Auctions</h2>
//         <p className="text-lg font-semibold text-red-400 mb-6 flex items-center justify-center gap-2">
//           <FaClock /> Time Left: {formatTime(timeLeft)}
//         </p>
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
//           {bids.map((item) => (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.4 }}
//               className="bg-gray-800 backdrop-blur-lg bg-opacity-50 p-4 rounded-xl shadow-lg border border-gray-700 text-center hover:shadow-2xl transition-all"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-28 h-28 object-cover rounded-lg mx-auto mb-3 border border-gray-600 shadow-md"
//               />
//               <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
//               <div className="flex items-center justify-between mt-3">
//                 <p className="text-lg font-bold text-black flex items-center gap-1">
//                   <FaDollarSign /> ${item.currentBid}
//                 </p>
//                 <motion.button
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => placeBid(item.id, item.currentBid)}
//                   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all"
//                 >
//                   <FaGavel /> Place Bid
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default LiveAuction;
import { useState } from "react";
import { motion } from "framer-motion";
import { FaGavel, FaClock, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const liveAuctions = [
  { id: 1, name: "Luxury Sports Car", price: "$150,000", time: "02:30:15", image: "https://wallpapercrafter.com/desktop/40365-McLaren-P1-supercar-McLaren-luxury-cars-sports-car-hybrid-P1-GTR-concept-review.jpg" },
  { id: 2, name: "Antique Gold Watch", price: "$3,500", time: "00:45:10", image: "https://a.1stdibscdn.com/vintage-18-karat-gold-omega-seamaster-deville-bracelet-watch-for-sale/1121189/j_73111811566632176744/7311181_master.jpg" },
  { id: 3, name: "Vintage Painting", price: "$7,200", time: "04:15:20", image: "https://www.regentantiques.com/product_images/07602-Antique-Oil--Painting-Tavern-Scene-C.Costa-C1880-1.jpg" },
];

export default function LiveAuctions() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Live Auctions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveAuctions.map((auction) => (
          <motion.div
            key={auction.id}
            whileHover={{ scale: 1.05 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300"
          >
            <img src={auction.image} alt={auction.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <FaGavel className="mr-2 text-blue-500" /> {auction.name}
              </h3>
              <p className="text-gray-600 mt-1 flex items-center">
                <FaClock className="mr-2 text-red-500" /> {auction.time} left
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-green-600">{auction.price}</span>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Bid Now
                </button>
              </div>
            </div>
            <button
              className="absolute top-4 right-4 text-red-500 text-xl"
              onClick={() => toggleFavorite(auction.id)}
            >
              <FaHeart className={favorites.includes(auction.id) ? "fill-current" : "stroke-current"} />
            </button>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/all-auctions")}
          className="px-6 py-3 bg-gray-800 text-white text-lg rounded-lg hover:bg-gray-900 transition-all"
        >
          View More
        </button>
      </div>
    </div>
  );
}
