import auth from './api/auth';
import users from './api/users';
import posts from './api/posts';
import pages from './api/pages';
import taxonomies from './api/taxonomies';
import general from './api/general';
import classes from './api/classes';
import center from './api/center';
import subjectLevel from './api/subjectLevel';
import subject from './api/subject';
import wallet from './api/wallet'

export default (app) => {
  auth(app);
  general(app);
  posts(app);
  pages(app);
  users(app);
  taxonomies(app);
  classes(app);
  center(app);
  subjectLevel(app);
  subject(app);
  wallet(app);
};
