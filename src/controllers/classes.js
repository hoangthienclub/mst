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
    if (status !== '5') {
      totalClass = await Classes.count(query);
      classes = await Classes.find(query)
        .populate([
          {
            path: 'tutor',
            model: 'users',
          },
          {
            path: 'students',
            model: 'users',
          },
          {
            path: 'center',
            model: 'users',
          },
        ])
        .limit(+pageSize)
        .skip((+page - 1) * +pageSize)
        .sort({ createdAt: -1 });
    }
    if (status === '5') {
      delete query.type;
      totalClass = await Classes.count({ $or: [{ type: 3 }, { type: 4 }] });
      classes = await Classes.find({ $or: [{ type: 4 }, { type: 3 }] })
        .populate([
          {
            path: 'tutor',
            model: 'users',
          },
          {
            path: 'students',
            model: 'users',
          },
          {
            path: 'center',
            model: 'users',
          },
        ])
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

// centerId: {
//   type: String,
//   required: true
// },
// students: Array,
// userId: {

export const getClassDetail = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const classDetail = await Classes.findOne({ _id: classId }).populate([
      {
        path: 'tutor',
        model: 'users',
      },
      {
        path: 'students',
        model: 'users',
      },
      {
        path: 'center',
        model: 'users',
      },
    ]);
    return Success(res, classDetail);
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
      userId: user.userId,
      centerId: user.userId,
    };
    const newClass = await Classes(newItem).save();
    return Success(res, newClass);
  } catch (err) {
    return Failure(res, err);
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
