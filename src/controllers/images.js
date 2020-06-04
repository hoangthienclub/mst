
import { Success } from '../helpers';
import { loadFileFromFolder, loadFolderFromFolder } from '../helpers/google-drive';

export const getImages = async (req, res, next) => {
  try {
    const nextPageToken = req.query.nextPageToken;
    const pageSize = req.query.pageSize;
    const folderId = req.params.folderId;
    const data = await loadFileFromFolder(folderId, nextPageToken, pageSize);
    return Success(res, data);
  } catch (err) {
    return next(err);
  }
};

export const getFolders = async (req, res, next) => {
  try {
    const nextPageToken = req.query.nextPageToken;
    const data = await loadFolderFromFolder(nextPageToken);
    return Success(res, data);
  } catch (err) {
    return next(err);
  }
};
