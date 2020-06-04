import Classes from '../models/Classes';
import { Success, Failure } from '../helpers';

export const getClasses = async (req, res, next) => {
  try {
    let query = {};
    const { page = 1, pageSize = 10, status = 1 } = req.query;
    if (status) {
      query.type = status;
    }

    let totalClass = 0;
    let classes = [];
    if (status !== '6') {
      totalClass = await Classes.count(query);
      classes = await Classes.find(query)
        .limit(+pageSize)
        .skip((+page - 1) * +pageSize);
    }
    if(status === '6') {
      delete query.type;
      totalClass = await Classes.count(query);
      classes = await Classes.find({$or: [{type: 4}, {type: 5 }]})
        .limit(+pageSize)
        .skip((+page - 1) * +pageSize);
    }
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
