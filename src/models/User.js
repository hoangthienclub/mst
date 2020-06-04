import mongoose from '../config/database';
const UserSchema = new mongoose.Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    roleId: Number,
    phone: String,
    address: String,
    country: String,
    gender: String,
    status: Number,
    password: String
  },
  { timestamps: true, versionKey: false }
);
const User = mongoose.model('users', UserSchema);
export default User;
