import mongoose from '../config/database';
const WalletSchema = new mongoose.Schema(
  {
    currentAmount: Number,
    transactions: Array,
  },
  { timestamps: true, versionKey: false }
);
const Wallet = mongoose.model('wallet', WalletSchema);
export default Wallet;
