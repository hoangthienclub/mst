import mongoose from '../config/database';
const CenterSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    rating: Number,
  },
  { timestamps: true, versionKey: false }
);
const Center = mongoose.model('center', CenterSchema);
export default Center;
