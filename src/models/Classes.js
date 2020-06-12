import mongoose from '../config/database';

const ClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    subjectId : {
      type: String,
      required: true
    },
    subjectLevelId : {
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
    status: {
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
    price: {
      type: Number,
      default: 0
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
ClassSchema.virtual('subject', {
  ref: 'subjects',
  localField: 'subjectId',
  foreignField: '_id',
  justOne: true,
});
ClassSchema.virtual('subjectLevel', {
  ref: 'subjectlevels',
  localField: 'subjectLevelId',
  foreignField: '_id',
  justOne: true,
});
ClassSchema.set('toObject', { virtuals: true });
ClassSchema.set('toJSON', { virtuals: true });
const Classes = mongoose.model('class', ClassSchema);
export default Classes;
