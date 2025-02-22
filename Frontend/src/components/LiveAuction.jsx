import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDollarSign, FaGavel, FaClock } from "react-icons/fa";
import Navbar from "./Nav2";
import Footer from "./Footer";

const initialBids = [
  { id: 1, name: "iPhone 14 Pro", currentBid: 1200, image: "https://tse3.mm.bing.net/th?id=OIP.0vG8_FUIhejk5KJNExa-ZgHaHa&pid=Api&P=0&h=180" },
  { id: 2, name: "Tesla Model 3", currentBid: 35000, image: "https://tse4.mm.bing.net/th?id=OIP.o5D84SF2bzz0UhdFi46RFQHaEK&pid=Api&P=0&h=180" },
  { id: 3, name: "Rolex Submariner", currentBid: 9000, image: "https://tse1.mm.bing.net/th?id=OIP.LwHfu8Twp3F7PAGk5K2o1gHaHa&pid=Api&P=0&h=180" }
];

const LiveAuction = () => {
  const [bids, setBids] = useState(initialBids);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const bidInterval = setInterval(() => {
      setBids((prevBids) =>
        prevBids.map((item) => ({
          ...item,
          currentBid: item.currentBid + Math.floor(Math.random() * 50)
        }))
      );
    }, 5000);
    return () => clearInterval(bidInterval);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <>
      <Navbar />
      <div className="py-28 text-center text-white">
        <h2 className="text-4xl text-black font-bold mb-6">Live Auctions</h2>
        <p className="text-lg font-semibold text-red-400 mb-6 flex items-center justify-center gap-2">
          <FaClock /> Time Left: {formatTime(timeLeft)}
        </p>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {bids.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800 backdrop-blur-lg bg-opacity-50 p-4 rounded-xl shadow-lg border border-gray-700 text-center hover:shadow-2xl transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-lg mx-auto mb-3 border border-gray-600 shadow-md"
              />
              <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <p className="text-lg font-bold text-black flex items-center gap-1">
                  <FaDollarSign /> ${item.currentBid}
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all"
                >
                  <FaGavel /> Place Bid
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LiveAuction;