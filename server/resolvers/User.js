import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

function GenerateCode(length) {
  if (isNaN(length)) {
    throw new TypeError('Length of sms code must be a number');
  }
  if (length < 1) {
    throw new RangeError('Length must be at least 1');
  }
  const range = '0123456789';
  let string = '';
  for (let i = 0; i < length; i++) {
    string += range.charAt(Math.floor(Math.random() * range.length));
  }

  return parseInt(string);
}

export default {
  Query: {
    user: async (parent, { id }, { models: { userModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const user = await userModel.findById({ _id: id }).exec();
      return user;
    },
    users: async (parent, { numbers }, { models: { userModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const users = await userModel.find({ number: numbers }).exec();
      return user;
    },
    currentUser: (parent, args, { models: { userModel }, me }, info) => {
      if (!me) {
        return null;
      }
      return me;
    },
    getSMSCode: async (parent, { number }, { models: { userModel, authCodeModel } }, info) => {
      // we look for the user with the number, if we do not have it then
      // let's create one and store the code there
      let user = await userModel.findOne({ number }).exec();

      if (!user) {
        user = await userModel.create({
          number
        });
        if (!user) {
          throw new AuthenticationError('could not create a user with that number, must be taken')
        }

      } else {
        user.smsCode = smsCode;
        user.save();
      }

      // if the user already has an auth code, remove it
      if (user.code) {
        await authCodeModel.deleteOne({user})
      }

      // make the auth code entry for the user to validate and send the sms message
      const authCode = await authCodeModel.create({
        code: GenerateCode(4),
        user,
        expiry:
      })

      if (!authCode) {
        throw new AuthenticationError('could not make the auth code entry for said user')
      }

      // @TODO send the sms!

      return {
        user
      };
    },
    authenticate: async (parent, { code, userId }, {models: {userModel}} info) => {
      if (!userId) {
        throw new AuthenticationError('No user passed to get auth code');
      }

      const user = await userModel.findById({_id: userId}).exec();

      if (!user) {
        throw new AuthenticationError('could not find the user by the ID passed')
      }

      const authCode = user.code;

      if (authCode !== code) {
        throw new AuthenticationError('code does not match');
      }

      // @TODO make sure the code is not expired

      // no expiry on the token is intentional so that they
      // not need to keep logging in on the phone
      const token = jwt.sign({ id: user.id }, 'riddlemethis');

      return {
        token
      };
    }
  },
  User: {
    messages: async ({ id }, args, { models: { messageModel } }, info) => {
      const messages = await messageModel.find({ author: id }).exec();
      return messages;
    },
    chats: async ({ id }, args, { models: { chatModel } }, info) => {
      const myChats = await chatModel.find({ owner: id }).exec();
      const chatsIAmIn = await chatModel.find({ members: id }).exec();

      return [...myChats, ...chatsIAmIn];
    },
    code: async ({ code }, args, { models: { authCodeModel } }, info) => {
      const authCode = await authCodeModel.findById({ _id: code });
      return authCode;
    }
  }
};
