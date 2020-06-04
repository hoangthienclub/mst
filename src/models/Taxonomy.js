import mongoose from '../config/database';
const TaxonomySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    type: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true, versionKey: false }
);
const Taxonomy = mongoose.model('taxonomies', TaxonomySchema);
export default Taxonomy;
