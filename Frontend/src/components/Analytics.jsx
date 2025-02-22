import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Navbar from "./Nav2";
import Footer from "./Footer";
import { FaGavel, FaChartBar } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Auction Insights",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export function AuctionStats() {
  const [stats, setStats] = useState({
    totalBids: 0,
    highestBid: 0,
    activeAuctions: 0,
    bidData: [],
  });

  useEffect(() => {
    // Simulating fetching data from API
    const fetchData = () => {
      const bidData = labels.map(() => Math.floor(Math.random() * 1000));
      const highestBid = Math.max(...bidData);
      setStats({
        totalBids: bidData.reduce((a, b) => a + b, 0),
        highestBid,
        activeAuctions: Math.floor(Math.random() * 20 + 1),
        bidData,
      });
    };
    fetchData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Bids in Auction 1",
        data: stats.bidData,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
      {
        label: "Bids in Auction 2",
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        backgroundColor: "rgba(53, 162, 235, 0.7)",
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center py-28 bg-gray-100 min-h-screen">
        <h2 className="text-5xl font-extrabold mb-6 text-center">Auction Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-10 max-w-4xl">
          <div className="bg-primary p-6 rounded-lg shadow-md text-white flex flex-col items-center">
            <FaGavel className="text-4xl text-white" />
            <h3 className="text-xl font-semibold mt-3">Total Bids</h3>
            <p className="text-2xl font-bold">{stats.totalBids}</p>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-md text-white flex flex-col items-center">
            <FaChartBar className="text-4xl text-white" />
            <h3 className="text-xl font-semibold mt-3">Highest Bid</h3>
            <p className="text-2xl font-bold">${stats.highestBid}</p>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-md text-white flex flex-col items-center">
            <FaGavel className="text-4xl text-white" />
            <h3 className="text-xl font-semibold mt-3">Active Auctions</h3>
            <p className="text-2xl font-bold">{stats.activeAuctions}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mt-6 h-[350px]">
          <Bar options={options} data={data} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AuctionStats;
