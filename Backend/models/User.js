import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["bidder", "seller", "admin"], default: "bidder" },
  walletBalance: { type: Number, default: 0 },
  profilePicture: { type: String },
  bio: { type: String },



},{timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;
