/* eslint-disable no-undef */
import {
  getCenters,
  createCenter,
  getCenterById,
  getStudentsByCenterId,
  getTutorsByCenterId,
  getAdminsByCenterId,
  getSettingsByCenterId,
  getClassesByCenterId,
  deleteCenters,
  deactivateCenterById,
  updateCenterById,
} from '../../controllers/center';
import { isAuth } from '../../middleware/auth';

export default (app) => {
  app.get('/centers', isAuth, getCenters);
  app.post('/centers', isAuth, createCenter);
  app.get('/centers/:centerId', isAuth, getCenterById);
  app.get('/centers/:centerId/students', isAuth, getStudentsByCenterId);
  app.get('/centers/:centerId/tutors', isAuth, getTutorsByCenterId);
  app.get('/centers/:centerId/admins', isAuth, getAdminsByCenterId);
  app.get('/centers/:centerId/settings', isAuth, getSettingsByCenterId);
  app.get('/centers/:centerId/classes', isAuth, getClassesByCenterId);
  app.delete('/centers/', isAuth, deleteCenters);
  app.patch('/centers/:centerId', isAuth, deactivateCenterById);
  app.put('/centers/:centerId', isAuth, updateCenterById);
};
