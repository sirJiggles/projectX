import { AuthenticationError } from 'apollo-server';
import { subscribe } from 'graphql';

const CHATS = 'NEW_CHATS';

export default {
  Query: {
    chat: async (parent, { id }, { models: { chatModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const chat = await chatModel.findById({ _id: id }).exec();
      return chat;
    },
    chats: async (parent, args, { models: { chatModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      // get all my chats and chats that I am a member of
      const myChats = await chatModel.find({ owner: me.id }).exec();
      const chatsIAmIn = await chatModel.find({ members: me.id }).exec();

      return [...myChats, ...chatsIAmIn];
    }
  },
  Subscription: {
    newChat: {
      subscribe: () => pubsub.asyncIterator(CHATS)
    }
  },
  Mutation: {
    createChat: async (
      parent,
      { name, members },
      { models: { chatModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }

      // we need to look at the members at this point and see if we have them
      // we will make them as tmp users for now in the system if not
      // members.forEach((member) => {
      //   const {number, name, avatar} = member;
      //   const user = await userModel.find({number}).exec()
      //   if (!user) {
      //     userModel.create({
      //       name,
      //       number,
      //       avatar
      //     })
      //   }
      // })

      const chat = await chatModel.create({
        name,
        owner: me.id,
        members,
        // all chats start with no messages
        messages: []
      });
      // anyone who is listening who is invited to a chat
      pubsub.publish(CHATS, {
        newChat: chat
      });
      return chat;
    }
  },
  Chat: {
    owner: async ({ owner }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: owner }).exec();
      return user;
    },
    members: async ({ memberIds }, args, { models: { userModel } }, info) => {
      const members = await userModel
        .find({
          _id: {
            $in: memberIds
          }
        })
        .exec();
      return members;
    },
    messages: async ({ id }, args, { models: { messageModel } }, info) => {
      const messages = await messageModel.find({ chat: id }).exec();
      return messages;
    }
  }
};
