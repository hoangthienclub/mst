import mongoose from '../config/database';
const WalletSchema = new mongoose.Schema(
  {
    currentBalance: Number,
    transactions: Array,
  },
  { timestamps: true, versionKey: false }
);
const Wallet = mongoose.model('wallet', WalletSchema);
export default Wallet;
