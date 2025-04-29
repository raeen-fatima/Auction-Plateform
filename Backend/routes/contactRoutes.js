// routes/contactRoutes.js
import express from 'express';
import { contactUs } from '../controllers/contactController.js';

const router = express.Router();

// Route to handle contact form submission
router.post('/contact', contactUs);

export default router;
