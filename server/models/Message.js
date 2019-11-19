import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chat'
  }
});

const message = mongoose.model('message', messageSchema);

export default message;
