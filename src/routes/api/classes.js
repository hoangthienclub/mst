/* eslint-disable no-undef */
import { getClasses, createClass, deleteAllClass } from '../../controllers/classes';
import { isAuth } from '../../middleware/auth';

export default (app) => {
  app.get('/classes', isAuth, getClasses);
  app.post('/class', isAuth, createClass);
  app.delete('/classes', isAuth, deleteAllClass);
};
