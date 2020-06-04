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
    status: Number, //1: wait active, 2: active
    password: String,
  },
  { timestamps: true, versionKey: false }
);
const User = mongoose.model('users', UserSchema);
export default User;
