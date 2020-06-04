import Center from '../models/Center';
import { Success, Failure } from '../helpers';

export const getCenter = async (req, res, next) => {
  try {
    let query = {};
    const { page = 1, pageSize = 10 } = req.query;

    const centers = await Center.find(query)
      .limit(+pageSize)
      .skip((+page - 1) * +pageSize);
    return Success(res, centers);
  } catch (err) {
    return next(err);
  }
};
export const getCenterById = async (req, res, next) => {
  try {
    // let query = {};
    // const { roleId, page = 1, pageSize = 10} = req.query;
    // if (roleId) {
    //   query.roleId = roleId;
    // }

    // const totalUser = await User.count(query);
    // const users = await User.find(query).limit(+pageSize).skip((+page - 1) * +pageSize);
    return Success(res, {});
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
