import crypto from "crypto";
import razorpay from "../config/Razorpay.js";
import Payment from "../models/payment.js";
import User from "../models/User.js";

// 🎯 Create Order
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ msg: "Invalid amount" });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json({ orderId: order.id });
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ msg: "Server error while creating order" });
  }
};

// 🔐 Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      userId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const hmac = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (hmac !== razorpay_signature) {
      return res.status(400).json({ msg: "Invalid signature" });
    }

    const payment = await Payment.create({
      user: userId,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status: "success",
    });

    const user = await User.findById(userId);
    user.walletBalance += amount;
    await user.save();

    res.status(200).json({ msg: "Payment successful", walletBalance: user.walletBalance });
  } catch (err) {
    console.error("Verify Error:", err);
    res.status(500).json({ msg: "Error verifying payment" });
  }
};
