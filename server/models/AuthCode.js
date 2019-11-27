import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const AuthCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

const authcode = mongoose.model('authcode', userSchema);

export default authcode;
