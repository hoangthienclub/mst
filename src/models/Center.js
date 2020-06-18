import mongoose from '../config/database';
const CenterSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    rating: Number,
    settings: Object,
    tutors: Array,
    admins: Array,
    students: Array,
    classes: Array,
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);
const Center = mongoose.model('center', CenterSchema);
export default Center;
