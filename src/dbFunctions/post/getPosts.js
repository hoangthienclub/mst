import Post from '../../models/Post';
import _ from 'lodash';

const getPosts = async (query) => {
  console.log('thien:', query)
  const condition = _.get(query, 'condition', {});
  const sort = _.get(query, 'sort', { updatedAt: -1 });
  const page = _.get(query, 'page', 1);
  const perpage = _.get(query, 'perpage', 10);
  const project = _.get(query, 'project', {
    title: 1,
    slug: 1,
    excerpt: 1,
    content: 1,
    thumbnail: 1,
    categories: '$categories',
    tags: '$tags',
    user: {
      userId: '$user._id',
      fullName: '$user.fullName',
      username: '$user.username',
    },
    status: 1,
    type: 1,
    createdAt: 1,
    updatedAt: 1,
  });

  return await Post.aggregate([
    { $match: condition },
    // {
    //   $lookup: {
    //     from: 'users',
    //     localField: 'userId',
    //     foreignField: '_id',
    //     as: 'user',
    //   },
    // },
    // { $unwind: '$user' }, // Chuyển mảng có 1 phần tử thành 1 object
    {
      $lookup: {
        from: 'taxonomies',
        let: { taxonomies: '$taxonomies' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $in: ['$_id', '$$taxonomies.taxonomyId'] }, { $in: ['$type', [1]] }],
              },
            },
          },
          {
            $project: {
              _id: 0,
              categoryId: '$_id',
              name: 1,
              slug: 1,
            },
          },
        ],
        as: 'categories',
      },
    },
    {
      $lookup: {
        from: 'taxonomies',
        let: { taxonomies: '$taxonomies' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $in: ['$_id', '$$taxonomies.taxonomyId'] }, { $in: ['$type', [2]] }],
              },
            },
          },
          {
            $project: {
              _id: 0,
              tagId: '$_id',
              name: 1,
              slug: 1,
            },
          },
        ],
        as: 'tags',
      },
    },
    { $sort: sort },
    { $skip: +perpage * +page - +perpage },
    { $limit: +perpage },
    {
      $project: project,
    },
  ]);
};
export default getPosts;
