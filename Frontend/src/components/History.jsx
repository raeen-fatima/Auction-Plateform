import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHistory, FaCheckCircle, FaTimesCircle, FaShoppingCart, FaStore } from "react-icons/fa";
import Sidebar from "./Nav2";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [view, setView] = useState("buyer");

  useEffect(() => {
    // Mock history data (Replace with API call in real implementation)
    const mockBuyerHistory = [
      { id: 1, auction: "Vintage Watch", finalBid: "$500", date: "2024-01-15", status: "Won" },
      { id: 2, auction: "Antique Vase", finalBid: "$300", date: "2024-02-05", status: "Lost" },
      { id: 3, auction: "Rare Painting", finalBid: "$1200", date: "2024-03-20", status: "Won" },
    ];

    const mockSellerHistory = [
      { id: 4, auction: "Luxury Pen", finalBid: "$150", date: "2024-01-10", status: "Sold" },
      { id: 5, auction: "Old Camera", finalBid: "$450", date: "2024-02-18", status: "Pending" },
      { id: 6, auction: "Classic Car Model", finalBid: "$2200", date: "2024-03-25", status: "Sold" },
    ];

    setHistory(view === "buyer" ? mockBuyerHistory : mockSellerHistory);
  }, [view]);

  return (
    <div className="container min-h-screen py-20 bg-gray-100 flex">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-6"
      >
        <h1 className="text-3xl font-bold mt-10 mb-4 flex items-center gap-2">
          <FaHistory className="text-blue-600" /> Auction History
        </h1>
        <p className="text-gray-700 mb-6">Review your past auction activities as a Buyer or Seller.</p>

        {/* Toggle Buyer/Seller View */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView("buyer")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white font-semibold ${view === "buyer" ? "bg-blue-600" : "bg-gray-400"}`}
          >
            <FaShoppingCart /> Buyer History
          </button>
          <button
            onClick={() => setView("seller")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white font-semibold ${view === "seller" ? "bg-green-600" : "bg-gray-400"}`}
          >
            <FaStore /> Seller History
          </button>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left">Auction Item</th>
                <th className="p-3 text-left">Final Bid</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: item.id * 0.1 }}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-3">{item.auction}</td>
                  <td className="p-3">{item.finalBid}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3 flex items-center gap-2">
                    {item.status === "Won" || item.status === "Sold" ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : item.status === "Lost" ? (
                      <FaTimesCircle className="text-red-500" />
                    ) : (
                      <span className="text-yellow-500 font-semibold">{item.status}</span>
                    )}
                    {item.status}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default HistoryPage;
