import Subject from '../models/Subject';
import { Success, Failure } from '../helpers';

export const createSubject = async (req, res, next) => {
  try {
    const data = new Subject({
      description: req.body.description,
      subjectLevelId: req.body.subjectLevelId
    })
    await data.save();
    return Success(res, data);
  } catch (err) {
    return Failure(res, err);
  }
};

