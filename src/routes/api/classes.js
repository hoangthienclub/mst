/* eslint-disable no-undef */
import { getClasses, createClass, deleteAllClass, getClassDetail, bookClass, getRegisteredClasses } from '../../controllers/classes';
import { isAuth } from '../../middleware/auth';

export default (app) => {
  app.get('/classes', isAuth, getClasses);
  app.get('/classes/:classId', isAuth, getClassDetail);
  app.post('/class', isAuth, createClass);
  app.delete('/classes', isAuth, deleteAllClass);
  app.post('/bookClass/:classId', isAuth, bookClass);
  app.get('/registeredClass', isAuth, getRegisteredClasses);
};
