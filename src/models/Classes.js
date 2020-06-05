import mongoose from '../config/database';

const ClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    description: String,
    startTime: String,
    duration: {
      type: Number,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    date: {
      type: Number,
      required: true
    },
    endTime: String,
    totalStudent: String,
    sambaUrl: String,
    type: {
      type: Number,
      required: true,
      default: 1
    },
    tutor: {
      type: String,
      required: true
    },
    center: String,
    tutorDetail: Object,
    centerDetail: Object,
    students: Array,
    createdBy: {
      type: String,
      required: true
    },
  },
  { timestamps: true, versionKey: false }
);
const Classes = mongoose.model('class', ClassSchema);
export default Classes;
