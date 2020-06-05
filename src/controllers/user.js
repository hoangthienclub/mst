import User from '../models/User';
import { Success, Failure } from '../helpers';
import { messages } from '../locales';

export const getUsers = async (req, res, next) => {
  try {
    let query = {};
    const { roleId, page = 1, pageSize = 10} = req.query;
    if (roleId) {
      query.roleId = roleId;
    }

    if (req.query.email) {
      query.email = req.query.email;
    }
    
    const totalUser = await User.count(query);
    const users = await User.find(query).limit(+pageSize).skip((+page - 1) * +pageSize);
    return Success(res, {
      totalUsers: totalUser,
      users
    });
  } catch (err) {
    return next(err);
  }
};

export const getUserByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId }, 'username email fullName phone thumbnail birthDay gender role status createdAt firstName lastName');

    if (!user) return Failure(res, messages.USER_NOT_FOUND, 404);
    return Success(res, { user });
  } catch (err) {
    return next(err);
  }
};

export const updateUserByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    if (role && req.authorization.role <= role) return Failure(res, messages.DO_NOT_HAVE_PERMISSION, 403); // Check role
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      {
        runValidators: true,
        new: true,
        select: 'username email fullName phone thumbnail birthDay gender role status createdAt updatedAt',
      }
    );
    if (!user) return Failure(res, messages.USER_NOT_FOUND, 404);
    return Success(res, { user });
  } catch (err) {
    return next(err);
  }
};

export const deleteUserByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId }, 'role');

    if (!user) return Failure(res, messages.USER_NOT_FOUND, 404);
    if (req.authorization.role <= user.role) return Failure(res, messages.DO_NOT_HAVE_PERMISSION, 403); // Check role

    const result = await User.findOneAndDelete({ _id: userId });
    if (result) return Success(res, {}, messages.USER_ALREADY_DELETED);
  } catch (err) {
    return next(err);
  }
};
