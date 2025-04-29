// routes/profileRoutes.js
import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import protect from '../middleware/authMiddleware.js';
import upload from '../middleware/uploads.js';

const router = express.Router();

router.get('/', protect, getProfile);
router.put('/', protect, upload.single('profilePicture'), updateProfile); // 👈 this line is important

export default router;
