import 'reflect-metadata';

import bodyParser from 'body-parser';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import router from './router'

import './database';
import './database/schemas/User';
import './database/schemas/Category';
import './database/schemas/Card';
import './database/schemas/Question';

import schema from './schemas';

const server = express();

server.use(bodyParser.json({ type: 'application/vnd.api+json' }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static('dist'));
server.use(router);

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    const context = {
      req,
      token: req?.headers?.authorization
    }

    return context;
  }
});
apolloServer.applyMiddleware({ app: server, path: '/graphql' });

const port = process.env.PORT || 4000;
server.listen({port}, () => console.log(`Server is running on port ${port}`))

export default server;