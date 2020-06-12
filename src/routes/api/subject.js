/* eslint-disable no-undef */
import { createSubject } from '../../controllers/subject';

export default (app) => {
  app.post('/subject', createSubject);
};
