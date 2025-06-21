// backend/config/cloudinary.js

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || (() => { throw new Error("CLOUDINARY_CLOUD_NAME not set"); })(),
  api_key: process.env.CLOUDINARY_API_KEY || (() => { throw new Error("CLOUDINARY_API_KEY not set"); })(),
  api_secret: process.env.CLOUDINARY_API_SECRET || (() => { throw new Error("CLOUDINARY_API_SECRET not set"); })(),
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "auction-products", // Cloud folder name
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export { cloudinary, storage };
