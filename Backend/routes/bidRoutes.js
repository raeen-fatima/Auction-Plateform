import express from "express";
import Bid from "../models/Bid.js";
import Product from "../models/Product.js";
import { getIO } from "../sockets/socketServer.js"; 
import protect from "../middleware/authMiddleware.js"; 
import Wallet from '../models/Wallet.js';

const router = express.Router();

//  Route: Place a new bid
router.post("/", protect, async (req, res) => {
    console.log("📨 req.user in bid route:", req.user); 

  const { productId, amount } = req.body;

  // 🔍 Step 1: Input check
  if (!productId || !amount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    //  Step 2: Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //  Step 3: Check auction end time
    const now = new Date();
    const auctionEndTime = new Date(product.endTime);
    if (now > auctionEndTime) {
      return res.status(400).json({ message: "Auction has ended. You can't place a bid." });
    }

    // Step 4: Get latest/highest bid (if any)
    const latestBid = await Bid.findOne({ product: productId }).sort({ createdAt: -1 });

    // Step 5: Determine minimum valid bid amount
    const currentHighest = latestBid ? latestBid.amount : product.startPrice;

    if (amount <= currentHighest) {
      return res.status(400).json({
        message: `Bid must be higher than ₹${currentHighest}`,
      });
    }

    const newBid = new Bid({
      product: productId,
      amount,
      user: req.user.id 
    });

    await newBid.save();

    //  Step 7: Notify all clients using socket
    const io = getIO();
    io.emit("newBid", {
      productId,
      amount,
      bidId: newBid._id,
      userId: req.user.id, 
      createdAt: newBid.createdAt,
    });

    res.status(201).json({ message: "Bid placed successfully", bid: newBid });

  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ message: "Server error while placing bid" });
  }
});
//  Route: Get all bids of the logged-in user
router.get("/mybids", protect, async (req, res) => {
  try {
    const bids = await Bid.find({ user: req.user.id })
      .populate("product", "title image startPrice endTime") // only needed fields
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (err) {
    console.error("Error fetching my bids:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/place-bid', async (req, res) => {
  const { userId, bidAmount } = req.body;

  try {
    // Get user's wallet balance
    const wallet = await Wallet.findOne({ userId });
    if (wallet.balance < bidAmount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    // Deduct bid amount from wallet balance
    wallet.balance -= bidAmount;
    await wallet.save();

    // Proceed with bid logic (e.g., save bid in auction database)
    res.status(200).json({ message: 'Bid placed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Bid placement failed' });
  }
});

export default router;
