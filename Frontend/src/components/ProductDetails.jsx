import { useState, useEffect } from "react";

const AuctionProduct = () => {
  const [product, setProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/products/1") // Replace with actual backend API
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        calculateTimeLeft(data.auction_end);
      });
  }, []);

  useEffect(() => {
    if (!timeLeft) return;
    const interval = setInterval(() => calculateTimeLeft(product.auction_end), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const calculateTimeLeft = (endTime) => {
    const difference = new Date(endTime) - new Date();
    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    } else {
      setTimeLeft(null);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-2xl p-4 border rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img src={product.image} alt={product.name} className="w-80 h-80 object-cover" />
          <h2 className="text-xl font-bold mt-4">{product.name}</h2>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-green-600 font-semibold mt-2">Starting Bid: ${product.starting_bid}</p>
          <p className="text-sm text-gray-400">Item Condition: {product.condition}</p>
          {timeLeft ? (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">Time Left:</p>
              <p>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </p>
            </div>
          ) : (
            <p className="text-red-500 mt-4">Auction Ended</p>
          )}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Place a Bid</button>
        </div>
      </div>
    </div>
  );
};

export default AuctionProduct;
