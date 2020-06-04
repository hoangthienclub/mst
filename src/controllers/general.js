import _ from 'lodash';
import Post from '../models/Post';
import { Success, Failure } from '../helpers';
import db from '../dbFunctions';

export const searchPosts = async (req, res, next) => {
  try {
    const { q, page, perpage } = req.query;
    const condition = {
      $and: [
        {
          $or: [
            { title: new RegExp(q, 'i') },
            { slug: new RegExp(_.replace(q, new RegExp(' ', 'g'), '-'), 'i') },
            { excerpt: new RegExp(q, 'i') },
            { content: new RegExp(q, 'i') },
          ],
        },
        { type: 1 },
      ],
    };

    const posts = await db.getPosts({ condition, page, perpage });
    const totalItems = await Post.countDocuments(condition);
    return Success(res, { totalItems, posts });
  } catch (err) {
    return next(err);
  }
};

export const searchPages = async (req, res, next) => {
  try {
    const { q, page, perpage } = req.query;
    const condition = {
      $and: [{ $or: [{ title: new RegExp(q, 'i') }, { excerpt: new RegExp(q, 'i') }, { content: new RegExp(q, 'i') }] }, { type: 2 }],
    };
    const pages = await db.getPosts({ condition, page, perpage });
    const totalItems = await Post.countDocuments(condition);
    return Success(res, { totalItems, pages });
  } catch (err) {
    return next(err);
  }
};

export const searchCategories = async (req, res, next) => {};
export const searchTags = async (req, res, next) => {};

export const search = async (req, res, next) => {
  try {
    const { type } = req.query;
    switch (type) {
      case 'post':
        searchPosts(req, res, next);
        break;
      case 'page':
        searchPages(req, res, next);
        break;
      case 'category':
        searchCategories(req, res, next);
        break;
      case 'tag':
        searchTags(req, res, next);
        break;
      default:
        searchPosts(req, res, next);
    }
  } catch (err) {
    return next(err);
  }
};
