import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { addMinutes, differenceInMinutes } from 'date-fns';
import Nexmo from 'nexmo';
import dotenv from 'dotenv';

dotenv.config();

const EXPIRY_TIME_MINS = 5;

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET
});

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
    getSMSCode: async (
      parent,
      { number },
      { models: { userModel, authCodeModel } },
      info
    ) => {
      // we look for the user with the number, if we do not have it then
      // let's create one and store the code there
      let user = await userModel.findOne({ number }).exec();

      if (!user) {
        user = await userModel.create({
          number
        });
        if (!user) {
          throw new AuthenticationError(
            'could not create a user with that number, must be taken'
          );
        }
      }

      // if the user already has an auth code, remove it / them all
      if (user.code) {
        await authCodeModel.delete({ user });
      }

      const code = GenerateCode(4);

      // make the auth code entry for the user to validate and send the sms message
      const authCode = await authCodeModel.create({
        code,
        user,
        expiry: addMinutes(new Date().toISOString(), EXPIRY_TIME_MINS)
      });

      if (!authCode) {
        throw new AuthenticationError(
          'could not make the auth code entry for said user'
        );
      }

      let text = `<#> Your auth code is: ${code}
        It will expire in ${EXPIRY_TIME_MINS} mins ⏱
      `;

      nexmo.message.sendSms(
        'Frank',
        number,
        text,
        {
          type: 'unicode'
        },
        (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            if (responseData.messages[0]['status'] === '0') {
              console.log('Message sent successfully.');
            } else {
              console.log(
                `Message failed with error: ${responseData.messages[0]['error-text']}`
              );
            }
          }
        }
      );

      return {
        user
      };
    },
    authenticate: async (
      parent,
      { code, userId },
      { models: { userModel } },
      info
    ) => {
      if (!userId) {
        throw new AuthenticationError('No user passed to get auth code');
      }

      const user = await userModel.findById({ _id: userId }).exec();

      if (!user) {
        throw new AuthenticationError(
          'could not find the user by the ID passed'
        );
      }

      const authCode = user.code;

      if (authCode !== code) {
        throw new AuthenticationError('code does not match');
      }

      if (
        differenceInMinutes(new Date(authCode.expiry), new Date()) >
        EXPIRY_TIME_MINS
      ) {
        throw new AuthenticationError('code has expired, please try again');
      }

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
