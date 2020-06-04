import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import { decodeToken } from '../helpers/auth';
import Auth from '../models/Auth';
import { Failure } from '../helpers';
import { messages } from '../locales';

import { accessTokenSecret } from '../helpers/constant';
export const isAuth = async (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  const accessToken = req.headers['accesstoken'];
  if (!accessToken) return Failure(res, messages.ACCESS_TOKEN_IS_REQUIRED, 403);
  if (!userAgent) return Failure(res, messages.USER_AGENT_IS_REQUIRED, 403);
  try {
    // check định dạng token, hết hạn
    const decoded = await decodeToken(accessToken, accessTokenSecret);
    // check xem access token có tồn tại trong DB hay ko (nếu muốn ép logout chỉ cần xóa access token trong DB)
    // Có thể đổi qua lưu token ở Redis nếu muốn
    const existAuth = await Auth.findOne({ userId: ObjectId(decoded.user.userId), accessToken, userAgent });
    if (!existAuth) return Failure(res, messages.UNAUTHORIZED, 401);
    req.authorization = decoded.user;
    next();
  } catch (err) {
    return Failure(res, messages.UNAUTHORIZED, 401);
  }
};
