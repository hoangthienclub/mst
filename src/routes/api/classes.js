/* eslint-disable no-undef */
import { getClasses, createClass } from '../../controllers/classes';
import { isAuth } from '../../middleware/auth';

export default (app) => {
  app.get('/classes', isAuth, getClasses);
  app.post('/class', isAuth, createClass);
};
