/* eslint-disable no-undef */
import aws from 'aws-sdk';
import { awsAccessId, awsRegion, awsBucket, awsSecretAccessKey } from '../helpers/constant.js';

aws.config.update({
  accessKeyId: awsAccessId,
  secretAccessKey: awsSecretAccessKey,
  region: awsRegion,
});
const s3 = new aws.S3();

export const uploadToS3 = async (fileName, bufferFile) => {
  try {
    await s3
      .putObject({
        Bucket: awsBucket,
        Key: `sihoang.io/images/${fileName}`,
        ContentType: 'image/png',
        Body: new Buffer.from(bufferFile, 'base64'),
      })
      .promise();
  } catch (err) {
    console.log('----- Upload file lỗi...', err);
  }
};
