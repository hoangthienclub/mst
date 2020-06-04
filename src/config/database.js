import mongoose from 'mongoose';
import { nodeEnv, dbHost, dbPort, dbUser, dbPass, dbName } from './../helpers/constant';

const dbConnect = nodeEnv === 'production' ? `${dbUser}:${dbPass}@` : `${dbUser}:${dbPass}@`;
mongoose.connect(`mongodb://${dbConnect}${dbHost}:${dbPort}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
  console.log('Connected Mongo DB');
});

export default mongoose;
