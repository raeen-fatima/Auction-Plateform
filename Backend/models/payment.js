import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true },
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  status: {
    type: String,
    enum: ["success", "fail"],
    default: "success",
  },
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
