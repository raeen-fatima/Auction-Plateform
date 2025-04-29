// controllers/dashboardController.js
import User from "../models/User.js";
import Bid from "../models/Bid.js";
import Product from "../models/Product.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; 

    // 1. Wallet Balance
    const user = await User.findById(userId);
    const walletBalance = user?.walletBalance || 0;

    // 2. Active Bids Count (Products where current time < endTime)
    const activeBids = await Bid.find({ user: userId })
      .populate("product", "endTime");
    
    const now = new Date();
    const activeBidCount = activeBids.filter(bid => bid.product.endTime > now).length;

    // 3. Total Auctions Won
    const auctionsWon = await Product.find({ winner: userId });
    const totalAuctionsWon = auctionsWon.length;

    // 4. Recent Activities (last 3 bids)
    const recentBids = await Bid.find({ user: userId })
      .populate("product", "title")
      .sort({ createdAt: -1 })
      .limit(3);

    const recentActivity = recentBids.map(bid => ({
      type: "Bid Placed",
      productTitle: bid.product?.title || "Unknown Product",
      amount: bid.amount,
      time: bid.createdAt
    }));

    // Final response
    res.status(200).json({
      walletBalance,
      activeBidCount,
      totalAuctionsWon,
      recentActivity
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
