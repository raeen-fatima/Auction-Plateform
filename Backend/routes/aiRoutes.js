import express from "express";
import { getAIResponse } from "../controllers/aiController.js";

const router = express.Router();
router.post("/ask", getAIResponse);

export default router;
