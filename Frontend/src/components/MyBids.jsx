import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/bids/mybids", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBids(res.data);
      } catch (error) {
        console.error("Error fetching bids:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [token]);

  const getBidStatus = (bid) => {
    const now = new Date();
    const end = new Date(bid.product?.endTime);

    if (now < end) return "Ongoing";
    if (bid.amount >= bid.product?.highestBid) return "Won";
    return "Lost";
  };

  const statusColors = {
    Ongoing: "bg-yellow-100 text-yellow-700",
    Won: "bg-green-100 text-green-700",
    Lost: "bg-red-100 text-red-700",
  };

  if (loading) return <p className="text-center text-lg mt-6">Loading your bids...</p>;
  if (!bids.length) return <p className="text-center text-gray-500 mt-6">No bids found 😓</p>;

  return (
    <>
    <Navbar />
    <div className="p-4 py-24 max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-6 text-primary text-center"> My Bids History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bids.map((bid) => {
          const status = getBidStatus(bid);
          return (
            <div
              key={bid._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-600"
            >
              <Link to={`/product/${bid.product?._id}`}>
                {bid.product?.image && (
                  <img
                    src={`http://localhost:4001/uploads/${bid.product.image}`}
                    alt={bid.product.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                )}
              </Link>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-gray-100">
                    {bid.product?.title || "Untitled Product"}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded ${statusColors[status]}`}>
                    {status}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Start Price: <span className="font-medium">₹{bid.product?.startPrice}</span>
                </p>
                <p className="text-sm text-green-600">My Bid: ₹{bid.amount}</p>
                <p className="text-xs text-gray-500">
                  Bid Placed: {new Date(bid.createdAt).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  Ends: {new Date(bid.product?.endTime).toLocaleString()}
                </p>

                {/* 👇 Rebid Button */}
                {status === "Ongoing" && (
                  <Link
                    to={`/product/${bid.product?._id}`}
                    className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    Rebid
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default MyBids;
