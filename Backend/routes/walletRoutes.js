// routes/walletRoutes.js
import express from 'express';
import Razorpay from 'razorpay';
import Wallet from '../models/Wallet.js';

const router = express.Router();
const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY_ID",
  key_secret: "YOUR_RAZORPAY_KEY_SECRET",
});

// Route to initiate payment
router.post('/add-funds', async (req, res) => {
  const { amount, userId } = req.body;

  try {
    // Create order for Razorpay
    const options = {
      amount: amount * 100,  // amount in paise
      currency: 'INR',
      receipt: `receipt_${new Date().getTime()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save order details to your DB, if needed
    res.json({
      key: razorpay.key_id,
      orderId: order.id,
      amount: order.amount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Payment initiation failed' });
  }
});

// Route to capture payment after Razorpay payment success
router.post('/capture-payment', async (req, res) => {
  const { paymentId, orderId, userId } = req.body;

  try {
    // Capture the payment
    const payment = await razorpay.payments.fetch(paymentId);
    if (payment.status === 'captured') {
      // Add amount to user's wallet balance
      const wallet = await Wallet.findOne({ userId });
      wallet.balance += payment.amount / 100;  // Convert paise to INR
      await wallet.save();
      res.status(200).json({ message: 'Funds added successfully' });
    } else {
      res.status(400).json({ error: 'Payment not captured' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Payment capture failed' });
  }
});

router.get('/get-wallet-balance', async (req, res) => {
    const { userId } = req.query;  // Ensure you're sending `userId` as a query param
  
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const wallet = await Wallet.findOne({ userId });
  
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }
  
      return res.json({ balance: wallet.balance });
    } catch (error) {
      console.error("Error fetching wallet balance:", error);  // Log the error for debugging
      res.status(500).json({ error: 'Error fetching wallet balance' });
    }
  });
  
export default router;
