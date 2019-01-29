import {Schema, model} from 'mongoose'

const PostSchema:Schema = new Schema({
  title: {
    type: String,
    default: '',
    required: true
  },
  content: {
    type: String,
    default: '',
    required: true
  },
  slug: {
    type: String,
    default: '',
    required: true,
    unique: true,
    lowercase: true
  },
  image: {
    type: String,
    default: ''
  },
  __v: { type: Number, select: false }
},
{ timestamps: true });
export default model('Post', PostSchema);