import Classes from '../models/Classes';
import User from '../models/User';
import Center from '../models/Center';
import { Success, Failure } from '../helpers';
import { messages } from '../locales';

export const getClasses = async (req, res, next) => {
  try {
    let query = {};
    const { page = 1, pageSize = 10, status } = req.query;
    if (status) {
      query.status = status;
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
      delete query.status;
      totalClass = await Classes.count({ $or: [{ status: 3 }, { status: 4 }] });
      classes = await Classes.find({ $or: [{ status: 4 }, { status: 3 }] })
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

export const bookClass = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const { userId } = req.body;
    console.log('body=', userId);
    let classDetail = await Classes.findById(classId);
    if (classDetail.status === 3 || classDetail.status === 4) {
      return Failure(res, messages.CLASS_HAVE_COMPLETED, 500);
    }
    const students = classDetail.students;
    if (students.includes(userId)) {
      return Failure(res, messages.ALREADY_JOIN_CLASS, 500);
    }
    students.push(userId);
    classDetail = await Classes.findOneAndUpdate({ _id: classId }, { students, status: 2 }, { returnOriginal: false });
    return Success(res, classDetail);
  } catch (err) {
    return next(err);
  }
};

export const getRegisteredClasses = async (req, res, next) => {
  try {
    let query = {};
    const { page = 1, pageSize = 10, status } = req.query;
    const { userId } = req.body;
    if (status) {
      query.status = status;
    }

    let totalClass = 0;
    let classes = [];
    if (status !== '5') {
      totalClass = await Classes.count({ ...query, students: { $in: [userId] } });
      classes = await Classes.find({ ...query, students: { $in: [userId] } })
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
      delete query.status;
      totalClass = await Classes.count({ $or: [{ status: 3 }, { status: 4 }], students: { $in: [userId] } });
      classes = await Classes.find({ $or: [{ status: 4 }, { status: 3 }], students: { $in: [userId] } })
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
