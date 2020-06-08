/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import {} from 'dotenv/config';
import _ from 'lodash';
import ejs from 'ejs';
import routes from './routes';
import { messages } from './locales';
import { appPort, timeOut } from './helpers/constant';
import { Failure } from './helpers';
import { validAccessToken } from './helpers/auth';
const app = express();
app.use(cors());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(helmet()); // lọc các HTTP header độc hại
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/*', (req, res, next) => {
//   const signatureToken = req.headers['signature-token'];
//   if (!validAccessToken(signatureToken)) return Failure(res, messages.SIGNATURE_TOKEN_IS_REQUIRED, 403);
//   global.language = req.headers.language || 'vi';
//   next();
// });

routes(app); // init routes
const routersList = app._router.stack
  .filter((r) => r.route)
  .map((r) => {
    return {
      path: r.route.path,
      method: _.invert(r.route.methods)[true].toUpperCase(),
    };
  });
app.get('/', (req, res, next) => res.render('index', { routersList }));
app.use((err, req, res, next) => {
  res.setHeader('Cache-Control', 's-maxage=86400');
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  return Failure(res, messages.INTERNAL_SERVER_ERROR, 500);
});

app.use((req, res, next) => {
  res.setTimeout(+timeOut, () => {
    return Failure(res, messages.REQUEST_TIMEOUT, 408);
  });
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

process.on('SIGINT', () => process.exit());
const port = appPort;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
export default app;
