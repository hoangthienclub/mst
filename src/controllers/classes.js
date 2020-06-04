import Classes from '../models/Classes';
import { Success, Failure } from '../helpers';

export const getClasses = async (req, res, next) => {
  try {
    let query = {};
    const { page = 1, pageSize = 10, status } = req.query;
    if(status) {
      query.type = status;
    }

    const totalClass = await Classes.count(query);
    const classes = await Classes.find(query)
      .limit(+pageSize)
      .skip((+page - 1) * +pageSize);
    return Success(res, {
      totalClasses: totalClass,
      classes,
    });
  } catch (err) {
    return next(err);
  }
};

export const createClass = async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.authorization;
    const newItem = {
      ...body,
      tutor: user.id,
    };
    const newClass = await Classes(newItem).save();
    return Success(res, newClass);
  } catch (err) {
    return next(err);
  }
};
