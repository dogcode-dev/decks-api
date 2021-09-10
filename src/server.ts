import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';

import './database';
import './database/schemas/User';
import './database/schemas/Category';
import './database/schemas/Card';
import './database/schemas/Question';

import schema from './schemas';

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const context = {
      req,
      token: req?.headers?.authorization
    }

    return context;
  }
});

server.listen({ port: 4000 }, () => console.log('Server is running on port 4000'))
