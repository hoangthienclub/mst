import { Success } from '../helpers';
import Notification from '../models/Notification';

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ isDelete: false });
    return Success(res, { notifications });
  } catch (err) {
    return next(err);
  }
};

export const getNotificationByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ user: userId, isDelete: false });
    return Success(res, { notifications });
  } catch (err) {
    return next(err);
  }
};

export const deleteUserNotifications = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await Notification.updateMany({ user: userId }, { isDelete: true });
    return Success(res, {});
  } catch (err) {
    return next(err);
  }
};
