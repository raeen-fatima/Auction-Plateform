// backend/models/Product.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  startPrice: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: ["ongoing", "ended", "upcoming"],
    default: "upcoming",
  },
  image: {
    type: String,
    required: true,
  },
  auctionEnded: { 
    type: Boolean, 
    default: false
   },
  winner: { 
    type: String 
  },
  finalPrice: {
     type: Number
  },
  sellerId: {
  type: String,
  required: true,
},

},{
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);
export default Product;
