import express from "express";
import Auction from "../models/Auction.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Auction Create API (Protected)
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, startingPrice, endTime } = req.body;
    const newAuction = new Auction({
      title,
      description,
      startingPrice,
      currentBid: startingPrice,
      endTime,
      seller: req.user.id, // JWT se userID milega
    });

    await newAuction.save();
    res.status(201).json({ success: true, message: "Auction Created", auction: newAuction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ✅ Get All Active Auctions
router.get("/", async (req, res) => {
  try {
    const auctions = await Auction.find({ endTime: { $gt: new Date() } }).populate("seller", "name email");
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ✅ Place a Bid
router.post("/:id/bid", protect, async (req, res) => {
  try {
    const { amount } = req.body;
    const auction = await Auction.findById(req.params.id);

    if (!auction) return res.status(404).json({ message: "Auction Not Found" });
    if (amount <= auction.currentBid) return res.status(400).json({ message: "Bid must be higher" });

    auction.currentBid = amount;
    auction.highestBidder = req.user.id;
    auction.bids.push({ user: req.user.id, amount });

    await auction.save();
    res.json({ success: true, message: "Bid Placed", auction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
