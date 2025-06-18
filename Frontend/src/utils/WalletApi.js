// src/api/walletAPI.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001/api',
});

// Create order
export const createOrder = (amount) =>
  API.post('/payment/create-order', { amount });

// Verify payment
export const verifyPayment = (data) =>
  API.post('/payment/verify', data);
