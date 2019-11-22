import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import * as PhoneCodes from '../utils/CountryCodes';

function formatPhoneNumber(number) {
  // first lets remove all the spaces
  let formattedNumber = number.replace(' ', '');
  // now lets remove the county codes if supplied
  PhoneCodes.foreach(country => {
    formattedNumber = formattedNumber.replace(country.dial_code, '0');
  });
  return formattedNumber;
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
      // format the incoming phone numbers to make sure we can find them
      numbers = numbers.map(number => {
        return formatPhoneNumber(number);
      });
      const users = await userModel.find({ number: numbers }).exec();
      return user;
    },
    currentUser: (parent, args, { models: { userModel }, me }, info) => {
      if (!me) {
        return null;
      }
      return me;
    },
    login: async (
      parent,
      { number, password },
      { models: { userModel } },
      info
    ) => {
      number = formatPhoneNumber(number);
      const user = await userModel.findOne({ number }).exec();

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials');
      }

      // no expiry on the token is intentional so that they
      // not need to keep logging in on the phone
      const token = jwt.sign({ id: user.id }, 'riddlemethis');

      return {
        token
      };
    }
  },
  Mutation: {
    createUser: async (
      parent,
      { number, password },
      { models: { userModel } },
      info
    ) => {
      number = formatPhoneNumber(number);
      const user = await userModel.create({ number, password });
      return user;
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
    }
  }
};
