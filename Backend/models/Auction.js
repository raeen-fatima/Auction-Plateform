import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startingPrice: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  endTime: { type: Date, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bids: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number, required: true },
      bidTime: { type: Date, default: Date.now },
    },
  ],
});

const Auction = mongoose.model("Auction", auctionSchema);
export default Auction;
