// backend/routes/dashboard.js
import express from "express";
import Bid from "../models/Bid.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/dashboard
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Fetch user for walletBalance
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Active Bids
    const activeBids = await Bid.find({ user: userId }).populate("product");
    const activeBidCount = activeBids.filter(
      (bid) => bid.product && bid.product.status === "ongoing"
    ).length;

    // 3. Auctions Won
    const auctionsWon = await Product.find({ winner: userId });

    // 4. Final response
    res.json({
      walletBalance: user.walletBalance, // 👈 fetched from DB
      activeBidCount,
      totalAuctionsWon: auctionsWon.length,
    });

  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data." });
  }
});

export default router;
