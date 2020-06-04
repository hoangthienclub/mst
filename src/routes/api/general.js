import { search } from '../../controllers/general';
export default (app) => {
  app.get('/search', search);
};
