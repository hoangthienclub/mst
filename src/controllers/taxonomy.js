import Taxonomy from '../models/Taxonomy';
import { Success, Failure } from '../helpers';
import { messages } from '../locales';
import mongoose from 'mongoose';
import { getTypeNameTaxonomy } from '../services/taxonomy';
const ObjectId = mongoose.Types.ObjectId;

export const createTaxonomy = async (req, res, next) => {
  try {
    const taxonomy = await new Taxonomy(req.body).save();
    const result = getTypeNameTaxonomy(taxonomy.type, taxonomy);
    return Success(res, { ...result });
  } catch (err) {
    return next(err);
  }
};

export const updateTaxonomyByTaxonomyId = async (req, res, next) => {
  try {
    const { taxonomyId } = req.params;
    const taxonomy = await Taxonomy.findOneAndUpdate(
      { _id: taxonomyId },
      { $set: req.body },
      {
        runValidators: true,
        new: true,
        select: 'name slug description thumbnail type createdAt updatedAt',
      }
    );
    if (!taxonomy) return Failure(res, messages.TAXONOMY_NOT_FOUND, 404);
    const result = getTypeNameTaxonomy(taxonomy.type, taxonomy);
    return Success(res, { ...result });
  } catch (err) {
    return next(err);
  }
};

export const deleteTaxonomyByTaxonomyId = async (req, res, next) => {
  try {
    const { taxonomyId } = req.params;
    const result = await Taxonomy.findOneAndDelete({ _id: taxonomyId });
    if (!result) return Failure(res, messages.TAXONOMY_NOT_FOUND, 404);
    return Success(res, {}, messages.TAXONOMY_ALREADY_DELETED);
  } catch (err) {
    return next(err);
  }
};

export const getTaxonomies = async (req, res, next) => {
  try {
    const { type } = req.query;
    const taxonomies = await Taxonomy.find({ type: +type });
    const result = getTypeNameTaxonomy(type, taxonomies);
    return Success(res, { ...result });
  } catch (err) {
    return next(err);
  }
};

export const getTaxonomy = async (req, res, next) => {
  try {
    const { unique } = req.params;
    const condition = ObjectId.isValid(unique) ? { _id: ObjectId(unique) } : { slug: unique };
    const taxonomy = await Taxonomy.findOne(condition);
    if (!taxonomy) return Failure(res, messages.TAXONOMY_NOT_FOUND, 404);
    const result = getTypeNameTaxonomy(taxonomy.type, taxonomy);
    return Success(res, { ...result });
  } catch (err) {
    return next(err);
  }
};

