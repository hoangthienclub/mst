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
    const { pageSize = 10, page = 1 } = req.query;
    const totalNotification = await Notification.count({ user: userId, isDelete: false });
    const notifications = await Notification.find({ user: userId, isDelete: false })
      .limit(+pageSize)
      .skip((+page - 1) * +pageSize)
      .sort({ read: 1, updatedAt: -1 });
    return Success(res, { totalNotifications: totalNotification, notifications });
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

export const createUserNotifications = async (req, res, next) => {
  try {
    const data = req.body;
    const notification = await new Notification(data).save();
    return Success(res, { notification });
  } catch (err) {
    return next(err);
  }
};

export const updateNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findOneAndUpdate({ _id: notificationId }, { read: true }, { new: true });
    return Success(res, { notification });
  } catch (err) {
    return next(err);
  }
};
