import mongoose from '../config/database';
const TransactionSchema = new mongoose.Schema(
  {
    amount: Number,
    reason: String,
  },
  { timestamps: true, versionKey: false }
);
const Transaction = mongoose.model('transaction', TransactionSchema);
export default Transaction;
