/* eslint-disable no-undef */
import { getSubjectLevels, createSubjectLevel } from '../../controllers/subjectLevel';

export default (app) => {
  app.get('/subject-levels', getSubjectLevels);
  app.post('/subject-level', createSubjectLevel);
};
