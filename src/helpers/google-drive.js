import { google } from 'googleapis';
const drive = google.drive('v3');
import { googleKey, googleFolderImage } from './constant';
import { getBase64 } from './index';
import requestImageSize from 'request-image-size';
const jwToken = new google.auth.JWT(
    googleKey.client_email,
    null,
    googleKey.private_key, ["https://www.googleapis.com/auth/drive"],
    null
);


export const loadFolderFromFolder = async (pageToken) => {
    return new Promise(resolve => {
        drive.files.list({
            auth: jwToken,
            includeRemoved: false,
            spaces: 'drive',
            fileId: googleFolderImage,
            fields: 'nextPageToken, files(*)',
            pageSize: 20,
            q: `'${googleFolderImage}' in parents`,
            pageToken: pageToken
        }, async function (err, response) {
            if (err) return resolve({
                nextPageToken: null,
                files: []
            });
            const files = response.data.files;
            const nextPageToken = response.data.nextPageToken;
            const result = [];
            if (files.length) {
                await Promise.all(files.map(async (file) => {
                    result.push({
                        mimeType: file.mimeType,
                        id: file.id,
                        name: file.name
                    });
                }));
            }
            resolve({
                nextPageToken,
                folders: result
            });
        });
    });
}


export const loadFileFromFolder = async (folderId, pageToken, pageSize = 10) => {
    const info = await drive.files.get({
        auth: jwToken,
            spaces: 'drive',
            fileId: folderId,
            fields: 'name',
            q: `'${folderId}' in parents`
        }
    )
    return new Promise(resolve => {
        drive.files.list({
            auth: jwToken,
            includeRemoved: false,
            spaces: 'drive',
            fileId: folderId,
            fields: 'nextPageToken, files(*)',
            pageSize,
            q: `'${folderId}' in parents`,
            pageToken: pageToken
        }, async function (err, response) {
            if (err) return resolve({
                nextPageToken: null,
                files: []
            });
            const files = response.data.files;
            const nextPageToken = response.data.nextPageToken;
            const result = [];
            if (files.length) {
                await Promise.all(files.map(async (file) => {
                    let size = { height: 0, width: 0 };
                    let base64 = null;
                    try {
                        size = await requestImageSize(file.thumbnailLink);
                        base64 = await getBase64(file.thumbnailLink)
                    }
                    catch(err) { console.log(err)}
                    result.push({
                        src: file.webContentLink,
                        thumbnail: {
                            src: base64,
                            height: size.height,
                            width: size.width
                        },
                        mimeType: file.mimeType,
                        id: file.id,
                        name: file.name
                    });
                }));
            }
            resolve({
                name: info.data.name,
                nextPageToken,
                files: result
            });
        });
    });
}