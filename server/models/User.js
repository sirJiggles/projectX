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
  authcode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authcode'
  }
});

// userSchema.pre('save', function() {
//   const hashedPassword = bcrypt.hashSync(this.password, 12);
//   this.password = hashedPassword;
// });

const user = mongoose.model('user', userSchema);

export default user;
