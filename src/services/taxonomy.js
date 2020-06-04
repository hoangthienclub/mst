/* eslint-disable valid-typeof */
export const getTypeNameTaxonomy = (type, data) => {
  switch (+type) {
    case 1:
      return Array.isArray(data) ? { categories: data } : { category: data };
    case 2:
      return Array.isArray(data) ? { tags: data } : { tag: data };
    default:
    // code block
  }
};
