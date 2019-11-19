import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'message'
    }
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

const chat = mongoose.model('chat', chatSchema);

export default chat;
