import auth from './api/auth';
import users from './api/users';
import posts from './api/posts';
import pages from './api/pages';
import taxonomies from './api/taxonomies';
import general from './api/general';

export default (app) => {
  auth(app);
  general(app);
  posts(app);
  pages(app);
  users(app);
  taxonomies(app);
};
