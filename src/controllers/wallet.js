import Wallet from '../models/Wallet';
import { Success, Failure } from '../helpers';
import { messages } from '../locales';

export const getWallets = async (req, res, next) => {
  try {
    const wallets = await Wallet.find();
    return Success(res, wallets);
  } catch (err) {
    return next(err);
  }
};

export const getWalletById = async (req, res, next) => {
  try {
    const { walletId } = req.params;
    const wallet = await Wallet.find({ _id: walletId });
    return Success(res, wallet);
  } catch (err) {
    return next(err);
  }
};

export const updateAmountByWalletId = async (req, res, next) => {
  try {
    const { walletId } = req.params;
    const { action, amount } = req.body;
    let wallet = await Wallet.findById(walletId);
    let currentAmount = wallet.currentAmount;
    switch (action) {
      case 'withdraw':
        if (amount > currentAmount) {
          return Failure(res, messages.NOT_ENOUGH_AMOUNT, 500);
        }
        currentAmount -= amount;
        break;
      default:
        currentAmount += amount;
        break;
    }
    wallet = await Wallet.findOneAndUpdate({ _id: walletId }, { currentAmount }, { new: true });
    return Success(res, wallet);
  } catch (err) {
    return next(err);
  }
};
