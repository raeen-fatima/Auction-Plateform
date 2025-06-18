import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import http from "http";

import { initSocket } from "./sockets/socketServer.js";
import auctionScheduler from "./utils/auctionScheduler.js";

import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import dashboardRoutes from "./routes/dashboard.js";
import paymentRoutes from './routes/paymentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import aiRoutes from "./routes/aiRoutes.js";
import profileRoutes from './routes/profileRoutes.js';
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// After `const __dirname = ...`
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();
const server = http.createServer(app);


// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/payment', paymentRoutes);
app.use(contactRoutes);
app.use("/api/ai", aiRoutes);
app.use('/api/profile', profileRoutes);

// Initialize Socket.IO
initSocket(server);
auctionScheduler(); 

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
