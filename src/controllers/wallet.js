import Wallet from '../models/Wallet';
import Transaction from '../models/Transaction';
import { Success, Failure } from '../helpers';
import { messages } from '../locales';
import User from '../models/User';
import Classes from '../models/Classes';

export const getWallets = async (req, res, next) => {
  try {
    const wallets = await Wallet.find();
    return Success(res, { wallets });
  } catch (err) {
    return next(err);
  }
};

export const getWalletById = async (req, res, next) => {
  try {
    const { walletId } = req.params;
    const user = await User.findOne({ wallet: walletId });
    const userId = user._id.toString();
    const classes = await Classes.find({ isDelete: false, status: 3, students: { $in: [userId] } });
    const totalClass = classes.length;
    const wallet = await Wallet.find({ _id: walletId }).populate([
      {
        path: 'transactions',
        model: 'transaction',
      },
    ]);
    return Success(res, { wallet, completedClass: totalClass });
  } catch (err) {
    return next(err);
  }
};

export const updateAmountByWalletId = async (req, res, next) => {
  try {
    const { walletId } = req.params;
    const { action, amount } = req.body;
    let wallet = await Wallet.findById(walletId);
    let currentBalance = wallet.currentBalance;
    let transactions = wallet.transactions;
    switch (action) {
      case 'withdraw':
        if (amount > currentBalance) {
          return Failure(res, messages.NOT_ENOUGH_AMOUNT, 500);
        }
        currentBalance -= amount;
        break;
      default:
        currentBalance += amount;
        break;
    }
    const transactionData = {
      amount: amount,
      reason: `Make ${action} transaction with $${amount}`,
    };
    const transaction = await Transaction(transactionData).save();
    transactions.push(transaction._id);
    wallet = await Wallet.findOneAndUpdate({ _id: walletId }, { currentBalance, transactions }, { new: true });
    return Success(res, { wallet });
  } catch (err) {
    return next(err);
  }
};
