// backend/middleware/uploads.js

import multer from "multer";
import { storage } from "../config/cloudinary.js"; // Cloudinary config

const upload = multer({ storage });

export default upload;
