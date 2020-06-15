import User from '../models/User';
import { Success, Failure } from '../helpers';
import { messages } from '../locales';
import Wallet from '../models/Wallet';

export const getUsers = async (req, res, next) => {
  try {
    let query = {
      isDelete: false
    };
    const { roleId, page = 1, pageSize = 10 } = req.query;
    if (roleId) {
      query.roleId = roleId;
    }

    if (req.query.email) {
      query.email = req.query.email;
    }

    if (req.query.search) {
      query.email = { $regex: new RegExp(req.query.search, 'i') };
    }
    const totalUser = await User.count(query);
    const users = await User.find(query)
      .limit(+pageSize)
      .skip((+page - 1) * +pageSize)
      .populate([
        {
          path: 'wallet',
          model: 'wallet',
        },
      ]);
    return Success(res, {
      totalUsers: totalUser,
      users,
    });
  } catch (err) {
    return next(err);
  }
};

export const updateStatusUsers = async (req, res, next) => {
  try {
    const { userIds, status } = req.body;
    await User.updateMany(
      {
        _id: {
          $in: userIds,
        },
      },
      {
        status,
      }
    );
    return Success(res, {});
  } catch (err) {
    return next(err);
  }
};

export const deleteUsers = async (req, res, next) => {
  try {
    const { userIds } = req.body;
    await User.updateMany(
      {
        _id: {
          $in: userIds,
        },
      },
      {
        isDelete: true,
      }
    );
    return Success(res, {});
  } catch (err) {
    return next(err);
  }
};

export const getUserByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId }).populate([
      {
        path: 'wallet',
        model: 'wallet',
      },
    ]);

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
        select:
          'username email fullName phone thumbnail birthDay gender role status createdAt updatedAt firstName lastName educationLevel schoolName preferredLanguage countryOfResidence language nationality addressLine1 addressLine2 city state zipCode country mobilePhone phoneNumber1 phoneNumber2',
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

export const addFavorite = async (req, res, next) => {
  console.log('thien');
  try {
    const { userIds } = req.body;
    const user = req.authorization;
    await User.findOneAndUpdate(
      {
        _id: user.userId,
      },
      { $addToSet: { favorites: { $each: userIds } } }
    );

    let userData = await User.findOne({ _id: user.userId })
      .populate([
        {
          path: 'favorites',
          model: 'users',
        },
      ])
      .lean(); // dùng lean để trả về 1 kết quả JSON,
    return Success(res, {
      totalUsers: 0,
      users: userData.favorites,
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteFavorite = async (req, res, next) => {
  try {
    const { userIds } = req.body;
    const user = req.authorization;
    await User.findOneAndUpdate(
      {
        _id: user.userId,
      },
      { $pull: { favorites: { $in: userIds } } },
      { multi: true }
    );

    let userData = await User.findOne({ _id: user.userId })
      .populate([
        {
          path: 'favorites',
          model: 'users',
        },
      ])
      .lean(); // dùng lean để trả về 1 kết quả JSON,
    return Success(res, {
      totalUsers: 0,
      users: userData.favorites,
    });
  } catch (err) {
    return next(err);
  }
};

export const searchUsers = async (req, res, next) => {
  try {
    let query = {};
    const user = req.authorization;
    if (req.query.text) {
      query.email = { $regex: new RegExp(req.query.text, 'i') };
    }
    let users = await User.find(query);
    users = users.filter((i) => i._id != user.userId);
    return Success(res, {
      totalUsers: 0,
      users,
    });
  } catch (err) {
    return next(err);
  }
};

export const getFavoritesUser = async (req, res, next) => {
  try {
    const user = req.authorization;
    let limit = null;
    if (req.query.limit) {
      limit = req.query.limit;
    }
    let userData = await User.findOne({ _id: user.userId })
      .populate([
        {
          path: 'favorites',
          model: 'users',
          options: {
            limit: limit,
          },
        },
      ])
      .lean(); // dùng lean để trả về 1 kết quả JSON,
    return Success(res, {
      totalUsers: 0,
      users: userData.favorites,
    });
  } catch (err) {
    return console.log(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    let data = req.body;
    let wallet = await new Wallet({
      currentAmount: 0,
      transactions: [],
    }).save();
    data.wallet = wallet._id;
    data.status = 1;
    let user = await new User(data).save();
    return Success(res, { user });
  } catch (err) {
    return next(err);
  }
};
