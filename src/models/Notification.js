import mongoose from '../config/database';
const NotificationSchema = new mongoose.Schema(
  {
    content: String,
    read: {
      type: Boolean,
      default: false,
    },
    user: String,
    isDelete: {
      type: Boolean,
      default: false,
    },
    type: String,
  },
  { timestamps: true, versionKey: false }
);
const Notification = mongoose.model('notification', NotificationSchema);
export default Notification;
