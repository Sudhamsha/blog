import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    user: { type: Object, required: true },
  },
  { timestamp: true },
);

export default mongoose.model('Blog', schema);
