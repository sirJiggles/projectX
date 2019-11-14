import { AuthenticationError } from 'apollo-server';
import { PubSub } from 'apollo-server-express';
import { subscribe } from 'graphql';

const pubsub = new PubSub();

// what do we want to listen to for the messages
const MESSAGES = 'messages';

export default {
  Query: {
    message: async (parent, { id }, { models: { messageModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const message = await messageModel.findById({ _id: id }).exec();
      return message;
    },
    messages: async (parent, args, { models: { messageModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const messages = await messageModel.find({ author: me.id }).exec();
      return messages;
    }
  },
  Subscription: {
    // this is obviously mental as we should only get messages for a specific chat
    // but for our sample app who cares
    allMessages: async (
      parent,
      args,
      { models: { messageModel }, me },
      info
    ) => {
      subscribe: () => {
        pubsub.asyncIterator([MESSAGES]);
      };
      // const messages = await messageModel.find().exec();
      // return messages || [];
    }
  },
  Mutation: {
    createMessage: async (
      parent,
      { content },
      { models: { messageModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const message = await messageModel.create({
        content,
        author: me.id
      });
      // if anyone is listening to messages that where created
      pubsub.publish(MESSAGES, message);
      return message;
    }
  },
  Message: {
    author: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    }
  }
};
