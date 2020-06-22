/* eslint-disable no-undef */
import {
  getNotifications,
  getNotificationByUserId,
  deleteUserNotifications,
  createUserNotifications,
  updateNotification,
} from '../../controllers/notification';
import { isAuth } from '../../middleware/auth';

export default (app) => {
  app.get('/notifications', isAuth, getNotifications);
  app.get('/notifications/:userId', isAuth, getNotificationByUserId);
  app.delete('/notifications/:userId', isAuth, deleteUserNotifications);
  app.post('/notifications', isAuth, createUserNotifications);
  app.patch('/notifications/:notificationId', isAuth, updateNotification);
};
