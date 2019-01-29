import {Schema, model} from 'mongoose'

const UserSchema:Schema = new Schema({
  name: {
    type: String,
    default: '',
    required: true
  },
  username: {
    type: String,
    default: '',
    required: true,
    unique: true
  },
  email: {
    type: String,
    default: '',
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: '',
    required: true
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  __v: { type: Number, select: false }
},
{ timestamps: true });
export default model('User', UserSchema);