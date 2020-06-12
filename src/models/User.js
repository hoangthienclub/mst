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
    thumbnail: {
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQ3XRs4sh5V-q98Pi6ijQtuSE_qP22pLC9FMUUdKvEIgQjhEy2&usqp=CAU',
      type: String
    },
    avatar: String,
    key: {
      default: 'bd346535-5f16-422a-9830-3593120d0d14',
      type:  String
    },
    isDelete: {
      default: false,
      type: Boolean
    },
    favorites: Array,
    education: String,
    schoolName: String,
    preferredLanguage: String,
    birthday: String,
    countryOfResidence: String,
    language: String,
    nationality: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: Number,
    mobilePhone: String,
    phoneNumber1: String,
    phoneNumber2: String,
  },
  { timestamps: true, versionKey: false }
);
const User = mongoose.model('users', UserSchema);
export default User;
