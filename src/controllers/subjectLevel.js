import SubjectLevel from '../models/SubjectLevel';
import Subject from '../models/Subject';
import { Success, Failure } from '../helpers';

export const getSubjectLevels = async (req, res, next) => {
  try {
    let data = await SubjectLevel.find({})
    const data1 = await Subject.find({});
    data = data.map(i => {
      return {
        _id: i._id,
        description: i.description,
        subjects: data1
      };
    })
    return Success(res, data);
  } catch (err) {
    return next(err);
  }
};


export const createSubjectLevel = async (req, res) => {
  try {
    const data = new SubjectLevel({
      description: req.body.description
    })
    await data.save();
    return Success(res, data);
  } catch (err) {
    return Failure(res, err);
  }
}
