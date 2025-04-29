// config/nodemailer.js
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
// Create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
