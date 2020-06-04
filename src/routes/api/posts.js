import { initData, createPost, getPosts, getPost, updatePostByPostId, deletePostByPostId } from '../../controllers/post';
import { isAuth } from '../../middleware/auth';

export default (app) => {
  app.get('/posts-init', initData);


  app.get('/posts', (req, res, next) => {
    req.query = { type: 1, ...req.query };
    getPosts(req, res, next);
  });
  app.get('/posts/:unique', getPost);
  app.post('/posts', isAuth, (req, res, next) => {
    req.query = { type: 1, ...req.query };
    createPost(req, res, next);
  });
  app.put('/posts/:postId', isAuth, updatePostByPostId);
  app.delete('/posts/:postId', isAuth, deletePostByPostId);
};
