import { createTaxonomy, getTaxonomies, getTaxonomy, updateTaxonomyByTaxonomyId, deleteTaxonomyByTaxonomyId } from '../../controllers/taxonomy';
import { isAuth } from '../../middleware/auth';

export default (app) => {
  /* Categories */
  app.get('/categories', (req, res, next) => {
    req.query = { type: 1, ...req.query };
    getTaxonomies(req, res, next);
  });
  app.get('/categories/:unique', getTaxonomy);
  app.post('/categories', isAuth, (req, res, next) => {
    req.query = { type: 1, ...req.query };
    createTaxonomy(req, res, next);
  });
  app.put('/categories/:categoryId', isAuth, (req, res, next) => {
    const { categoryId: taxonomyId } = req.param;
    req.param = { taxonomyId, ...req.param };
    updateTaxonomyByTaxonomyId(req, res, next);
  });
  app.delete('/categories/:categoryId', isAuth, (req, res, next) => {
    const { categoryId: taxonomyId } = req.param;
    req.param = { taxonomyId, ...req.param };
    deleteTaxonomyByTaxonomyId(req, res, next);
  });

  /* Tags */
  app.get('/tags', (req, res, next) => {
    req.query = { type: 2, ...req.query };
    getTaxonomies(req, res, next);
  });
  app.get('/tags/:unique', getTaxonomy);
  app.post('/tags', isAuth, (req, res, next) => {
    req.body = { type: 2, ...req.body };
    createTaxonomy(req, res, next);
  });
  app.put('/tags/:tagId', isAuth, (req, res, next) => {
    const { tagId: taxonomyId } = req.param;
    req.param = { taxonomyId, ...req.param };
    updateTaxonomyByTaxonomyId(req, res, next);
  });
  app.delete('/tags/:tagId', isAuth, (req, res, next) => {
    const { tagId: taxonomyId } = req.param;
    req.param = { taxonomyId, ...req.param };
    deleteTaxonomyByTaxonomyId(req, res, next);
  });
};
