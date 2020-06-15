/* eslint-disable no-undef */
import { getWallets, getWalletById, updateAmountByWalletId } from '../../controllers/wallet';
import { isAuth } from '../../middleware/auth';

export default (app) => {
  app.get('/wallets', isAuth, getWallets);
  app.get('/wallet/:walletId', isAuth, getWalletById);
  app.put('/wallet/:walletId', isAuth, updateAmountByWalletId);
};
