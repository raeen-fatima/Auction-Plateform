import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const {
  title,
  description,
  currentBid = 0,
  startPrice,
  startTime,
  endTime,
  sellerId = "anonymous", // optional default
  status = "upcoming",     // or "active"
} = req.body;


    const image = req.file?.path || null; // Cloudinary image URL

    const product = new Product({
      title,
      description,
      currentBid,
      startPrice,
      startTime,
      endTime,
      sellerId,
      status,
      image, //  Cloudinary URL saved in DB
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "No product found" });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};
