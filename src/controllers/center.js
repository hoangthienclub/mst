import Center from '../models/Center';
import { Success, Failure } from '../helpers';

export const getCenters = async (req, res, next) => {
  try {
    let query = {
      isDelete: false,
    };
    const { page = 1, pageSize = 10 } = req.query;

    if (req.query.search) {
      query.name = { $regex: new RegExp(req.query.search, 'i') };
    }

    const totalCenter = await Center.count(query);
    const centers = await Center.find(query)
      .populate([
        {
          path: 'tutors',
          model: 'users',
        },
        {
          path: 'students',
          model: 'users',
        },
        {
          path: 'admins',
          model: 'users',
        },
        {
          path: 'classes',
          model: 'class',
        },
      ])
      .limit(+pageSize)
      .skip((+page - 1) * +pageSize);
    return Success(res, { totalCenters: totalCenter, centers });
  } catch (err) {
    return next(err);
  }
};

export const getCenterById = async (req, res, next) => {
  try {
    const { centerId } = req.params;

    const center = await Center.findOne({ _id: centerId }).populate([
      {
        path: 'tutors',
        model: 'users',
      },
      {
        path: 'students',
        model: 'users',
      },
      {
        path: 'admins',
        model: 'users',
      },
      {
        path: 'classes',
        model: 'class',
      },
    ]);
    return Success(res, { center });
  } catch (err) {
    return next(err);
  }
};

export const createCenter = async (req, res, next) => {
  try {
    const center = await new Center(req.body).save();
    return Success(res, center);
  } catch (err) {
    return next(err);
  }
};

export const getStudentsByCenterId = async (req, res, next) => {
  try {
    const { centerId } = req.params;

    const center = await Center.findOne({ _id: centerId }).populate([
      {
        path: 'students',
        model: 'users',
      },
    ]);
    const students = center.students;
    return Success(res, { students });
  } catch (err) {
    return next(err);
  }
};

export const getTutorsByCenterId = async (req, res, next) => {
  try {
    const { centerId } = req.params;

    const center = await Center.findOne({ _id: centerId }).populate([
      {
        path: 'tutors',
        model: 'users',
      },
    ]);
    const tutors = center.tutors;
    return Success(res, { tutors });
  } catch (err) {
    return next(err);
  }
};

export const getAdminsByCenterId = async (req, res, next) => {
  try {
    const { centerId } = req.params;

    const center = await Center.findOne({ _id: centerId }).populate([
      {
        path: 'admins',
        model: 'users',
      },
    ]);
    const admins = center.admins;
    return Success(res, { admins });
  } catch (err) {
    return next(err);
  }
};

export const getSettingsByCenterId = async (req, res, next) => {
  try {
    const { centerId } = req.params;

    const center = await Center.findOne({ _id: centerId });
    const settings = center.settings;
    return Success(res, { settings });
  } catch (err) {
    return next(err);
  }
};

export const getClassesByCenterId = async (req, res, next) => {
  try {
    const { centerId } = req.params;

    const center = await Center.findOne({ _id: centerId }).populate([
      {
        path: 'classes',
        model: 'class',
      },
    ]);
    const classes = center.classes;
    return Success(res, { classes });
  } catch (err) {
    return next(err);
  }
};

export const deleteCenterByCenterId = async (req, res, next) => {
  try {
    const { centerId } = req.params;

    await Center.findOneAndUpdate({ _id: centerId }, { isDelete: true });
    return Success(res, {});
  } catch (err) {
    return next(err);
  }
};
