import mongoose from '../config/database';
const { ObjectId } = mongoose.Types;
const AuthSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    default: null,
  },
  accessToken: {
    type: String,
    default: null,
  }
});
const Auth = mongoose.model('tokens', AuthSchema);
export default Auth;
