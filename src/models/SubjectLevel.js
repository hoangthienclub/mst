import mongoose from '../config/database';
const SubjectLevelSchema = new mongoose.Schema(
  {
    description: String
  },
  { timestamps: true, versionKey: false }
);
const SubjectLevel = mongoose.model('subjectlevel', SubjectLevelSchema);
export default SubjectLevel;
