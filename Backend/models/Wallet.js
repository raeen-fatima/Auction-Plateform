// models/Wallet.js
import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    default: 0
  }
});

const Wallet = mongoose.model('Wallet', walletSchema);
export default Wallet;
