/* eslint-disable valid-typeof */
export const getPostType = (type, data) => {
  switch (+type) {
    case 1:
      return Array.isArray(data) ? { posts: data } : { post: data };
    case 2:
      return Array.isArray(data) ? { pages: data } : { page: data };
    default:
    // code block
  }
};
