import mongoose from '../config/database';

const ClassSchema = new mongoose.Schema(
  {
    title: String,
    subject: String,
    description: String,
    startTime: String,
    endTime: String,
    totalStudent: String,
    sambaUrl: String,
    type: Number,
    tutor: String,
    center: String,
  },
  { timestamps: true, versionKey: false }
);
const Classes = mongoose.model('class', ClassSchema);
export default Classes;
