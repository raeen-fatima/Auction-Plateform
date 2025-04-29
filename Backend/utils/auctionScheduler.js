// utils/auctionScheduler.js
import cron from "node-cron";
import Product from "../models/Product.js";
import Bid from "../models/Bid.js";
import { getIO } from "../sockets/socketServer.js";

const auctionScheduler = () => {
  cron.schedule("*/10 * * * * *", async () => {
    const now = new Date();

    // Get all active products whose endTime has passed
    const expiredAuctions = await Product.find({
      endTime: { $lte: now },
      auctionEnded: { $ne: true },
    });

    for (const product of expiredAuctions) {
      const highestBid = await Bid.findOne({ product: product._id })
        .sort({ amount: -1 })
        .limit(1);

      // Mark product as ended
      product.auctionEnded = true;
      if (highestBid) {
        product.winner = highestBid.user || "Unknown";
        product.finalPrice = highestBid.amount;
      }
      await product.save();

      // Emit socket event
      const io = getIO();
      io.emit("auctionEnded", {
        productId: product._id,
        winner: product.winner,
        finalPrice: product.finalPrice,
      });

      console.log(`Auction ended for ${product.title}`);
    }
  });
};

export default auctionScheduler;
