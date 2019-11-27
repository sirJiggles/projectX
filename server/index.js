import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose, { Model } from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import http from 'http';

import typeDefs from './schemas';
import resolvers from './resolvers';

import userModel from './models/User';
import messageModel from './models/Message';
import chatModel from './models/Chat';
import authCodeModel from './models/AuthCode';

const app = express();
app.use(cors());

const getUser = async req => {
  const token = req.headers['authorization'];

  if (token) {
    const cleanToken = token.replace('Bearer ', '');
    try {
      return await jwt.verify(cleanToken, 'riddlemethis');
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      const context = {
        models: { userModel, messageModel, chatModel, authCodeModel },
        ...connection.context
      };
      return context;
    } else {
      if (req) {
        const me = await getUser(req);

        return {
          me,
          models: {
            userModel,
            messageModel,
            chatModel,
            authCodeModel
          }
        };
      }
    }
  }
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(5000, () => {
  mongoose.connect('mongodb://localhost:27017/graphql');
});
