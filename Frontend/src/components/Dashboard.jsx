import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGavel, FaChartLine, FaListAlt, FaBars } from "react-icons/fa";
import Sidebar from "./Nav2";
import BiddingTable from "./BiddingTable";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    "Bid won on Item #12",
    "New Auction posted: Vintage Watch",
    "Your bid was outbid on Item #5",
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/signIn");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar Toggle Button for Mobile */}
    

      {/* Sidebar (Visible on larger screens) */}
      <div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 py-28 p-6"
      >
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaGavel className="text-blue-600" /> Welcome to Auction Dashboard
          </h1>
        
        </div>

        <p className="text-gray-700 mb-6">Manage your auctions, listings, and track bids seamlessly.</p>

        {/* Auction Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-primary rounded-lg shadow-md flex items-center gap-4"
          >
            <FaChartLine className="text-white text-3xl" />
            <div>
              <p className="text-gray-400">Total Auctions</p>
              <h2 className="text-xl text-white font-semibold">12</h2>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-primary rounded-lg shadow-md flex items-center gap-4"
          >
            <FaListAlt className="text-white text-3xl" />
            <div>
              <p className="text-gray-400">Active Bids</p>
              <h2 className="text-xl text-white font-semibold">24</h2>
            </div>
          </motion.div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 overflow-y-auto max-h-40">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="text-gray-700 border-b py-2 last:border-b-0">
                {notification}
              </li>
            ))}
          </ul>
        </div>

        {/* Bidding Table */}
        <div className="overflow-x-auto">
          <BiddingTable />
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
