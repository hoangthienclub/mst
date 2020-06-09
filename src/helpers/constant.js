/* eslint-disable no-undef */
export const nodeEnv = process.env.NODE_ENV || 'production';
export const appName = process.env.APP_NAME || 'Sihoang.io';
export const appPort = process.env.PORT || process.env.APP_PORT || 6789;
export const appEmail = process.env.APP_EMAIL || 'sihoang221193@gmail.com';

export const timeOut = process.env.TIME_OUT || 10000;

export const dbName = process.env.DB_NAME || 'mst';
export const dbHost = process.env.DB_HOST || 'ds363058.mlab.com';
export const dbPort = process.env.DB_PORT || 63058;
export const dbUser = process.env.DB_USER || 'mst';
export const dbPass = process.env.DB_PASS || 'Aa123456';

export const frontendUrl = process.env.FRONTEND_URL || 'https://sihoang.io';
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'b3JkZXJfaWQ9NzkzNjd8dHlwZT1kZXZlbG9wZXJ8ZGF0ZT0yMDE2LTA0LTEyIDAyOjAyOjA5';
export const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRE || '30d';
export const sendgridApiKey = process.env.SENDGRID_API_KEY || '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';

export const awsAccessId = process.env.AWSE_ACCESS_ID || '';
export const awsSecretAccessKey = process.env.AWSE_SECRET_ACCESS_KEY || '';
export const awsBucket = process.env.AWSE_BUCKET || '';
export const awsRegion = process.env.AWSE_REGION || '';

export const googleKey = {
  "type": "service_account",
  "project_id": "charged-garden-152704",
  "private_key_id": "c08ce6b81cfbe9056b17472e77f4be0f92b8ae8b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnKDWonEiX3HmX\nEz6TmDZidVl0S8Z8VDl/kOipLm+twLdhNA96Im5e8CEGVM/0r56t+Y3vP7IbSYm6\nyrDFjZgq74RPnKU9n+Ya0mMok2+sP62nnpNZ5qw6EA/6aq1nSuYre5VsM/t/pQCI\nv2M87x4D9KrfAXpaAUHgoPV3y7SaKrnro1GIwJ+z+Aw1nbDnbbz1iBpUUY387i8L\nNt2BUUJQn1MGj1pVKQ5O81p5SFJDt4nvwdxohzUlo0SX4g75ie7arCEtxZcR8GuL\n0SauAKOelLSFepRKeaQF15Y+PeKP83Nbszf1FCHfZyQEBu/wkOwgnIBxy7nOCuh2\nC2yjp3ylAgMBAAECggEAEAI5VVsWVrjuSio1KYR/3OEZPpqNOVYFpbJ2ndFNL8pP\npbcLLmrCwEPmHcmcmvYAz++hCMNEZvmdf66uzFS5uI700H0TlDnOm03/4iBwpwH4\nOx/kQ81kPDFSnmx+C/Dv50UwM8sssHZYfUA7HFhYOw/BF5d4JMuPCBjSOXVgaA08\njL4/rEcUAtgN4VF/4IdpQXRkwPKha7QFzmooQMxSof9IKJ6ghMwIaVz3L/pXrsYX\njSdS+JAA6PdsorWxPwVf90VqhexiNXMn+gJtfguEs5Ko7IauLieQNqTxGnq4cSDf\nHCBEiRqekuHZSssHaZMDL/hKoCtnExDOJV1ZmQyWVwKBgQDq2ngXcSEOfn9owyfX\n43q1ELqZvPQxDbie2FV/ez1JMnUQHmsBLGAw3V2DxukIveJZZHDuC4BMH+ACUCYu\nbezmhoolv+Qx65SgArW1cxuk/OFubDXhkR32kI2BBXuHEI3QwXvJYCZ+W39J9wWw\n94GEaZjFIDi8x8YWunelVLBXGwKBgQC2NUtEwcwN23jQF//iMPylHOtud8ejmtK3\nJyfR8UDNCMvQA3+ai0iFH6DzeW6oSWp6N0zEB/I7eYsm8olnqgkeaKyA3uKC6SnA\nmQ8QOBmkBPtNzMSZE2K3/j76jNlS4JmmO4jLqb5maooOBzMzpngtKnFdCnst3kgy\nKrOnuRX3PwKBgQC1WQmOoG60MH3VuYyUqjVgh5BvknbFQiEjl0096T4DvZCjZ7mc\n6FVGpkjFrtzXQTj9ag/B4OOq5JonbxhslblusMkQKULeQVk8zZreiAn6tsKkb66T\nhWkrsadyz3b5bpDzd9RMRZCz1ZdO2A5u/k/mnVu4LA9jxqdxeX9WDTU1rQKBgBQk\njh6awgEiKxfuH0aVHcjvCoPa0AIhInxG4tsNrZk9CLMFP/0IusqktXlVCkumWhQK\nuvzM2BWFGUID+/au0HVBIxjYCvhn6Eq3YPftC8CbIGD4ax91CivG+pVeLsQ/uhyr\nZjMFn9vYmUx1tU5Xb9+mWoPrnbRzZ03MdLHs/yWnAoGAY1Qyd2Q6uo92QrTLaqc2\nq0eV86Ssjo/Xb2Qps+em44SsvHnUfTefkbTs5JtdcOV4lJ8ocYAUCG5gjHu9AGq7\nAwvZE1A77UToFFtyjH/M91dl+XxFrz6jHqZTUH0TG4i0yTuFJ3RwKf8yWwXT7Z9y\nIDq7aF2OsgLDSGBZGKdrNoE=\n-----END PRIVATE KEY-----\n",
  "client_email": "googledrive@charged-garden-152704.iam.gserviceaccount.com",
  "client_id": "115698920562714200510",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/googledrive%40charged-garden-152704.iam.gserviceaccount.com"
};

export const googleFolderImage = '0B7kgLzdyo16tUW9WX1ZwMGhNZ2s';