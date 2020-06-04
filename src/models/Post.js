import mongoose from '../config/database';
const { ObjectId } = mongoose.Types;
const PostSchema = new mongoose.Schema({
    title: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      default: null,
    },
    excerpt: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    taxonomies: [
      {
        _id: false,
        taxonomyId: {
          type: ObjectId,
          default: null,
        },
      },
    ],
    status: {
      type: Number,
      default: 1, // 1: public, 2: private
    },
    userId: {
      type: ObjectId,
      default: null,
    },
    type: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true, versionKey: false }
);
const Post = mongoose.model('posts', PostSchema);
export default Post;
