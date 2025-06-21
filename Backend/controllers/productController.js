import Product from "../models/Product.js";
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
      sellerId = "test-seller",
      status = "upcoming",
    } = req.body;

    console.log("📥 Incoming Product Data:", {
      title, description, startPrice, startTime, endTime
    });

    if (!req.file) {
      console.error("🚫 No image file found in request");
      return res.status(400).json({ success: false, error: "Image not uploaded" });
    }

    const image = req.file.path;
    console.log("📸 Uploaded Image Path:", image);

    const product = new Product({
      title,
      description,
      currentBid,
      startPrice,
      startTime,
      endTime,
      sellerId,
      status,
      image,
    });

    await product.save();

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("❌ Create Product Error:", error);
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
