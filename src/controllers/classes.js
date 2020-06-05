import Classes from '../models/Classes';
import User from '../models/User';
import Center from '../models/Center';
import { Success, Failure } from '../helpers';

export const getClasses = async (req, res, next) => {
  try {
    let query = {};
    const { page = 1, pageSize = 10, status } = req.query;
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
    classes = await getDetail(classes);
    }
    if(status === '6') {
      delete query.type;
      totalClass = await Classes.count({$or: [{type: 4}, {type: 5 }]});
      classes = await Classes.find({$or: [{type: 4}, {type: 5 }]})
        .limit(+pageSize)
        .skip((+page - 1) * +pageSize);
        classes = await getDetail(classes);
    }
    return Success(res, {
      totalClasses: totalClass,
      classes,
    });
  } catch (err) {
    return next(err);
  }
};

export const getDetail = async (array) => {
  const promises = array.map(async (item) => {
    item.tutorDetail= await User.findOne({_id: item.tutor});
    item.centerDetail= await Center.findOne({_id: item.center});
    return item;
  });
  return Promise.all(promises);
}

export const createClass = async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.authorization;
    const newItem = {
      ...body,
      userId: user.userId,
      centerId: user.userId
    };
    const newClass = await Classes(newItem).save();
    return Success(res, newClass);
  } catch (err) {
    return Failure(err);
  }
};

export const deleteAllClass = async (req, res, next) => {
  try {
    let query = {};
    await Classes.remove(query);
    return Success(res, {});
  } catch (err) {
    return next(err);
  }
};
