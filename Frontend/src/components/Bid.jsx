import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

const Bid = ({ product, isAuctionEnded, isBidValid, bidAmount, setBidAmount, handleBidSubmit }) => {
  const handleBidChange = (type) => {
    const currentBid = parseFloat(bidAmount) || product.startPrice;
    const increment = 100;
    if (type === "increment") {
      setBidAmount((currentBid + increment).toString());
    } else if (type === "decrement" && currentBid > product.startPrice) {
      setBidAmount((currentBid - increment).toString());
    }
  };

  return (
    <div className="flex gap-7 items-center">
      <button
        onClick={() => handleBidChange("decrement")}
        disabled={isAuctionEnded}
        className="border border-primary p-3 rounded-full text-sm text-primary"
      >
        <FaMinus />
      </button>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        disabled={isAuctionEnded}
        className="w-28 px-3 py-2 border border-primary rounded-md text-center"
        placeholder="Your Bid"
      />
      <button
        onClick={() => handleBidChange("increment")}
        disabled={isAuctionEnded}
        className="border border-primary p-3 rounded-full text-sm text-primary"
      >
        <FaPlus />
      </button>
      <button
        onClick={handleBidSubmit}
        disabled={isAuctionEnded || !isBidValid}
        className={`px-6 py-2 rounded-lg text-white font-semibold shadow ${
          isBidValid ? "bg-primary hover:bg-blue-900" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Place Bid
      </button>

      {!isBidValid && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <FiAlertCircle /> Bid must be higher than the starting price.
        </p>
      )}
    </div>
  );
};

export default Bid;
