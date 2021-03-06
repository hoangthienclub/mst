/* eslint-disable no-undef */
import { body } from 'express-validator';
import {
  getUsers,
  getUserByUserId,
  updateUserByUserId,
  deleteUserByUserId,
  updateStatusUsers,
  deleteUsers,
  addFavorite,
  deleteFavorite,
  searchUsers,
  getFavoritesUser,
  createUser,
} from '../../controllers/user';
import { isAuth } from '../../middleware/auth';
import { Validate } from '../../helpers';
import { messages } from '../../locales';

export default (app) => {
  app.get('/users', isAuth, getUsers);
  app.get('/users-search', isAuth, searchUsers);
  app.get('/users/:userId', isAuth, getUserByUserId);
  app.put(
    '/users/:userId',
    isAuth,
    [
      body('username').not().exists().withMessage(messages.CANNOT_UPDATE_ACCOUNT),
      body('email').optional().isEmail().withMessage(messages.EMAIL_IS_INVALID),
      body('gender').optional().isInt().withMessage(messages.GENDER_IS_INVALID),
      body('role').optional().isInt().withMessage(messages.ROLE_IS_INVALID),
    ],
    Validate,
    updateUserByUserId
  );
  app.delete('/users/:userId', isAuth, deleteUserByUserId);
  app.put('/users', isAuth, updateStatusUsers);
  app.delete('/users', isAuth, deleteUsers);
  app.post('/user/favorite', isAuth, addFavorite);
  app.delete('/user/favorite', isAuth, deleteFavorite);
  app.get('/users-favorite', isAuth, getFavoritesUser);
  app.post('/users', createUser);
};
