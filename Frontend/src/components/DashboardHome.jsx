import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { 
  FaWallet, FaGavel, FaTrophy, FaHistory, FaCar, 
  FaDollarSign, FaSearch, FaUserCircle, FaSignOutAlt, FaPlusCircle 
} from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Blogs from "./Blogs";
import NewsletterForm from "./NewsLetter";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null); // ⬅️ State for dashboard data

  // 🔁 Fetch dashboard data from backend
  const fetchDashboardData = async (token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL
}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setDashboardData(data); // Set data
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // 🔐 Check auth & fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signIn");
    } else {
      fetchDashboardData(token);
    }
  }, [navigate]);

  // 🔓 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signIn");
  };

  // 🌀 Show loading while fetching
  if (!dashboardData) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-gray-500 text-xl animate-pulse">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-slate-200/60 backdrop-blur-md shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-10 border-b">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-200 px-4 py-2 rounded-md w-1/3 shadow-sm">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full"
              />
            </div>

            {/* Profile & Create Auction */}
            <div className="flex items-center gap-4">
              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                  className="flex items-center gap-2 text-gray-800 font-semibold"
                >
                  <FaUserCircle className="text-2xl" /> John Doe
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 mt-6">
            <motion.h1 
              className="text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome, John Doe
            </motion.h1>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {[
                { icon: FaWallet, color: "text-primary", title: "Wallet Balance", value: `$${dashboardData.walletBalance}` },
                { icon: FaGavel, color: "text-primary", title: "Active Bids", value: dashboardData.activeBids },
                { icon: FaTrophy, color: "text-primary", title: "Total Auctions Won", value: dashboardData.auctionsWon }
              ].map((card, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 shadow-lg rounded-lg flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <card.icon className={`${card.color} text-3xl`} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
                    <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            {/* Recent Activity */}
<motion.div 
  className="bg-white p-6 mt-6 shadow-lg rounded-lg"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  <div className="flex items-center gap-2 mb-3">
    <FaHistory className="text-gray-700 text-xl" />
    <h3 className="text-lg font-semibold text-gray-700">Recent Activity</h3>
  </div>

  {/* Render recentActivity from backend */}
  <ul className="space-y-2 text-gray-600">
    {dashboardData.recentActivity && dashboardData.recentActivity.length > 0 ? (
      dashboardData.recentActivity.map((activity, index) => (
        <li key={index} className="flex items-center gap-2">
          {activity.type === "bid" && (
            <>
              <FaCar className="text-primary" />
              Bid placed on <strong>{activity.item}</strong> - ${activity.amount}
            </>
          )}
          {activity.type === "win" && (
            <>
              <FaTrophy className="text-primary" />
              Auction won: <strong>{activity.item}</strong>
            </>
          )}
          {activity.type === "recharge" && (
            <>
              <FaDollarSign className="text-primary" />
              Wallet recharged - ${activity.amount}
            </>
          )}
        </li>
      ))
    ) : (
      <li className="text-gray-500">No recent activity found.</li>
    )}
  </ul>
</motion.div>

          </div>

          {/* Create Auction Button */}
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary w-40 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-900 transition"
            >
              <FaPlusCircle /> Create Auction
            </button>
          </div>

          {/* Create Auction Modal */}
        </div>
      </div>

      {/* Additional Sections */}
    </>
  );
};

export default DashboardHome;
