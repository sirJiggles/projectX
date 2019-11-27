import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    required: false
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'message'
    }
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'chat'
    }
  ],
  authcodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'authcode'
    }
  ]
});

const user = mongoose.model('user', userSchema);

export default user;
