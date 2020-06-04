/* eslint-disable no-undef */
import { getCenter, createCenter } from '../../controllers/center';
import { isAuth } from '../../middleware/auth';

export default (app) => {
  app.get('/centers', isAuth, getCenter);
  app.post('/center', isAuth, createCenter);
};
