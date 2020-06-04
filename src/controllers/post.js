import Post from '../models/Post';
import Taxonomy from '../models/Taxonomy';
import { Success, Failure } from '../helpers';
import { messages } from '../locales';
// import * as asyncRedis from 'async-redis';
import mongoose from 'mongoose';
import _ from 'lodash';
const ObjectId = mongoose.Types.ObjectId;
import db from '../dbFunctions';
// const client = asyncRedis.createClient();
import { getPostType } from '../services/post';
import { getTypeNameTaxonomy } from '../services/taxonomy';

export const initData = async (req, res, next) => {
  try {
    const postItem = (item) => {
      return Promise.resolve({
        title: `Hướng dẫn xây dựng một dự án React.js với Webpack và Babel ${item}`,
        slug: `huong-dan-xay-dung-mot-du-an-react-js-voi-webpack-va-babel-${item}`,
        excerpt: `Xin chào các bạn, hôm nay mình chia sẻ với các bạn cách tạo một dự án ReactJs với Webpack và Babel.
        Nếu chưa rõ Webpack là gì? Bạn có thể tham khảo bài viết Webpack là gì? Hiểu thêm về Webpack của mình nhé. ${item}`,
        content: `<p>Chúng ta cần cài thêm html-webpack-plugin, mục đích là dùng plugin này sinh ra một file Html (đã được chèn file bundle.js – file được webpack build ra) dựa trên file src/index.html của chúng ta.
        Nó sẽ dùng file src/index.html của chúng ta này như một template để ghi file Html mới vào dist/index.html. ${item}</p> `,
        thumbnail: 'https://znews-photo.zadn.vn/w660/Uploaded/mdf_uswreo/2019_10_23/junvu95_50900082_122786582108648_5110486536740177715_n.jpg',
        status: 1,
        taxonomies: [],
        type: 1,
      });
    };

    const getDataPosts = async () => {
      const unresolvedPromises = [...Array(20)].map((n, i) => postItem(i));
      const results = await Promise.all(unresolvedPromises);
      return results;
    };

    const dataPosts = await getDataPosts();
    await Post.insertMany(dataPosts);
    console.log('Inserting...');
    console.log('Done');
    return Success(res, {});
  } catch (err) {
    return next(err);
  }
};

export const clearData = async (req, res, next) => {
  try {
    const posts = await Post.deleteMany({});
    return Success(res, { posts });
  } catch (err) {
    return next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    let { categories, tags } = req.body;
    categories =
      categories &&
      categories.map((category) => {
        return { taxonomyId: category.categoryId };
      });
    tags =
      tags &&
      tags.map((tag) => {
        return { taxonomyId: tag.tagId };
      });
    const taxonomies = _.merge(categories, tags);
    let data = {
      ...req.body,
      taxonomies,
      userId: req.authorization.userId,
    };

    const post = await new Post(data).save();
    // client.set('isCachePost', JSON.stringify(false));
    return Success(res, { post });
  } catch (err) {
    return next(err);
  }
};

export const updatePostByPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;
    let { categories, tags } = req.body;
    categories =
      categories &&
      categories.map((category) => {
        return { taxonomyId: category.categoryId };
      });
    tags =
      tags &&
      tags.map((tag) => {
        return { taxonomyId: tag.tagId };
      });
    const taxonomies = _.merge(categories, tags);
    let data = {
      ...req.body,
      taxonomies,
      userId: req.authorization.userId,
    };
    await Post.findOneAndUpdate(
      { _id: postId },
      { $set: data },
      {
        runValidators: true,
        new: true,
        // select: 'title content thumbnail userId status createdAt updatedAt',
      }
    );
    const post = await db.getPost({ condition: { _id: ObjectId(postId) } });
    if (!post) return Failure(res, messages.POST_NOT_FOUND, 404);
    // client.set('isCachePost', JSON.stringify(false));
    return Success(res, { post });
  } catch (err) {
    return next(err);
  }
};

export const deletePostByPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({ _id: postId }, 'userId');
    if (!post) return Failure(res, messages.POST_NOT_FOUND, 404);
    if (req.authorization.userId !== post.userId.toString()) return Failure(res, messages.DO_NOT_HAVE_PERMISSION, 403); // Check role

    const result = await Post.findOneAndDelete({ _id: postId });
    if (result) {
      // client.set('isCachePost', JSON.stringify(false));
      return Success(res, {}, messages.POST_ALREADY_DELETED);
    }
  } catch (err) {
    return next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { type, taxonomySlug, page, perpage } = req.query;
    const { isAdmin } = req.headers;
    // const postsCache = JSON.parse(await client.get(`cache:posts:${page}:${perpage}`));
    // const totalItemsCache = JSON.parse(await client.get('cache:posts:totalItems'));
    // const isCachePost = JSON.parse(await client.get('isCachePost'));
    // if (isCachePost && postsCache) return Success(res, { totalItems: +totalItemsCache, posts: postsCache });

    let condition = { type: +type || 1, status: 1 };
    if (isAdmin) delete condition.status;
    let result = {};
    let taxonomy;
    if (taxonomySlug) taxonomy = await Taxonomy.findOne({ slug: taxonomySlug });
    if (taxonomy) {
      condition = { ...condition, taxonomies: { $elemMatch: { taxonomyId: ObjectId(taxonomy._id) } } };
      taxonomy = getTypeNameTaxonomy(taxonomy.type, taxonomy);
      result = { ...taxonomy };
    }

    const totalItems = await Post.countDocuments(condition);
    let posts = await db.getPosts({ condition, page, perpage });
    posts = getPostType(type, posts);

    // client.set('isCachePost', JSON.stringify(true));
    // client.set(`cache:posts:${page}:${perpage}`, JSON.stringify(posts));
    // client.set('cache:posts:totalItems', JSON.stringify(totalItems));
    result = { ...result, ...posts };

    return Success(res, { totalItems, ...result });
  } catch (err) {
    return next(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { unique } = req.params;
    const condition = ObjectId.isValid(unique) ? { _id: ObjectId(unique) } : { slug: unique };
    const post = await db.getPost({ condition });
    if (!post) return Failure(res, messages.POST_NOT_FOUND, 404);
    const result = getPostType(post.type, post);
    return Success(res, { ...result });
  } catch (err) {
    return next(err);
  }
};
