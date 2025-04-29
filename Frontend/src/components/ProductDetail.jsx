import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecommendedAuctions from "./RecommandedAuct";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CountdownTimer from "./Countdown";
import Payment from "./Payment"; // Import Payment Component
import Bid from "./Bid"; // Import Bid Component
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [isBidValid, setIsBidValid] = useState(true);

  const isAuctionEnded = timeLeft === "Auction ended";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error fetching product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const endTime = new Date(product.endTime).getTime();
    const updateTime = () => {
      const now = new Date().getTime();
      const difference = endTime - now;
      if (difference <= 0) {
        setTimeLeft("Auction ended");
        return;
      }
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    const timer = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(timer);
  }, [product]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!isBidValid) {
      toast.error("Bid amount should be higher than the starting price.");
      return;
    }

    try {
      await axios.post(
      `${process.env.REACT_APP_API_URL}/api/bids`,
        { productId: product._id, amount: bidAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Bid placed successfully!");
      setBidAmount("");
    } catch (err) {
      console.error("Error placing bid", err);
      toast.error(err?.response?.data?.message || "Failed to place bid");
    }
  };

  if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;
  if (!product) return <div className="text-center text-xl mt-10">Product not found</div>;

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="max-w-8xl mx-auto py-20 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-xl shadow-xl p-9">
          <img
            src={`${process.env.REACT_APP_API_URL}/uploads/${product.image}`}
            alt={product.title}
            className="w-full h-100 object-cover rounded-lg"
          />
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <CountdownTimer targetDate={product.endTime} />
            <p className="text-2xl font-bold underline text-black"> Start Price: ₹{product.startPrice}</p>

            <Bid product={product} isAuctionEnded={isAuctionEnded} isBidValid={isBidValid} bidAmount={bidAmount} setBidAmount={setBidAmount} handleBidSubmit={handleBidSubmit} />
            <Payment bidAmount={bidAmount || product.startPrice} />
          </div>
        </div>
        <RecommendedAuctions />
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
