import mongoose from '../config/database';
const SubjectLevelSchema = new mongoose.Schema(
  {
    code: String,
    description: String
  },
  { timestamps: true, versionKey: false }
);
const SubjectLevel = mongoose.model('subject', SubjectLevelSchema);
export default SubjectLevel;
