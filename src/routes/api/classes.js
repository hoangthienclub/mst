/* eslint-disable no-undef */
import { getClasses, createClass, deleteClasses, getClassDetail, bookClass, getRegisteredClasses, listClassByTime } from '../../controllers/classes';
import { isAuth } from '../../middleware/auth';

export default (app) => {
  app.get('/classes', isAuth, getClasses);
  app.get('/classes/:classId', isAuth, getClassDetail);
  app.post('/class', isAuth, createClass);
  app.delete('/classes', isAuth, deleteClasses);
  app.post('/bookClass/:classId', isAuth, bookClass);
  app.get('/registeredClasses', isAuth, getRegisteredClasses);
  app.get('/listClassByTime', isAuth, listClassByTime);
};
