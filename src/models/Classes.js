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
    startTime: {
      type: Number, 
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    sambaUrl: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      required: true,
      default: 1
    },
    tutorId: {
      type: String
    },
    centerId: {
      type: String,
      required: true
    },
    students: Array,
    userId: {
      type: String,
      required: true
    },
  },
  { timestamps: true, versionKey: false }
);
ClassSchema.virtual('center', {
  ref: 'center',
  localField: 'centerId',
  foreignField: '_id',
  justOne: true,
});
ClassSchema.virtual('tutor', {
  ref: 'users',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});
ClassSchema.set('toObject', { virtuals: true });
ClassSchema.set('toJSON', { virtuals: true });
const Classes = mongoose.model('class', ClassSchema);
export default Classes;
