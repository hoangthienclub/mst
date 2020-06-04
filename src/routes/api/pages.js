import { createPost, getPosts, getPost, updatePostByPostId, deletePostByPostId } from '../../controllers/post';
import { isAuth } from '../../middleware/auth';

export default (app) => {
  app.get('/pages', (req, res, next) => {
    req.query = { type: 2, ...req.query };
    getPosts(req, res, next);
  });
  app.get('/pages/:unique', getPost);
  app.post('/pages', isAuth, (req, res, next) => {
    req.query = { type: 2, ...req.query };
    createPost(req, res, next);
  });
  app.put('/pages/:pageId', isAuth, (req, res, next) => {
    const { pageId: postId } = req.param;
    req.param = { postId, ...req.param };
    updatePostByPostId(req, res, next);
  });
  app.delete('/pages/:pageId', isAuth, (req, res, next) => {
    const { pageId: postId } = req.param;
    req.param = { postId, ...req.param };
    deletePostByPostId(req, res, next);
  });
};
