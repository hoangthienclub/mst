import { getImages, getFolders } from '../../controllers/images';

export default (app) => {
  app.get('/folder/:folderId', async (req, res, next) => {
    req.query = { type: 1, ...req.query };
    getImages(req, res, next);
  });

  app.get('/folders', async (req, res, next) => {
    req.query = { type: 1, ...req.query };
    getFolders(req, res, next);
  });
};
