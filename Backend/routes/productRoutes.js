// backend/routes/productRoutes.js

import express from "express";
import { createProduct, getAllProducts ,getSingleProduct } from "../controllers/productController.js";
import upload from "../middleware/uploads.js";

const router = express.Router();

// Route to add a product
router.post("/create", upload.single("image"), createProduct);
router.get("/all", getAllProducts);
router.get("/:id", getSingleProduct);

export default router;
