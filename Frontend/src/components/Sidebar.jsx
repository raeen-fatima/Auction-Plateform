import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import {
  FaHome,
  FaUser,
  FaGavel,
  FaBell,
  FaBookmark,
  FaWallet,
  FaListAlt,
  FaChartBar,
} from "react-icons/fa";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Home", icon: <FaHome />, href: "/" },
    { name: "Auctions", icon: <FaGavel />, href: "/products" },
    { name: "User Profile", icon: <FaUser />, href: "/Profile" },
    { name: "Create Auction", icon: <FaBookmark />, href: "/productForm" },
    { name: "Transactions", icon: <FaWallet />, href: "/transactions" },
    { name: "Notifications", icon: <FaBell />, href: "/notifications" },
    { name: "My Bids", icon: <FaListAlt />, href: "/mybids" },
    { name: "Analytics", icon: <FaChartBar />, href: "/analytics" },
  ];

  return (
    <div className={`h-screen  ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 bg-primary text-white flex flex-col`}>
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-4 mb-8">
        <h2 className={`text-xl font-bold ${!sidebarOpen && "hidden"}`}>Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center p-3 hover:bg-blue-900 cursor-pointer rounded-md">
            <NavLink to={item.href} className="flex items-center  w-full">
              {item.icon}
              <span className={`ml-3 ${!sidebarOpen && "hidden"}`}>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
