import { validationResult } from 'express-validator';
import { messages } from '../locales';
import _ from 'lodash';
import fetch from 'fetch-base64';

export const Success = async (res, data) => {
  return res.send({
    message: messages.SUCCESS,
    status: 200,
    data: data || {},
  });
};

export const Failure = async (res, message, status, errorCode) => {
  return res.send({
    message: message || messages.SOMETHING_WENT_WRONG,
    status: status || 500,
    errorCode: errorCode || _.invert(messages)[message] || '',
  });
};

export const Validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log('Errors validate:', errors.array());
    return Failure(res, errors.array()[0].msg, 422);
  }
  return next();
};

export const getBase64 = async url => {
  return new Promise(resolve => {
    fetch.remote(url).then((data) => {
      resolve(data[1]);
    }).catch(() => {});
  })
}
