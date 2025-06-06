import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { typeDefs, resolvers } from './schema/index.js';
import { verifyUser } from './utils/auth.js';

dotenv.config();
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
context: ({ req }) => {
  try {
    const authHeader = req.headers.authorization || '';
    const user = verifyUser(authHeader);
    return { user };
  } catch (error) {
    return { user: null }; // allow unauthenticated access to some queries
  }
}
});

await server.start();
server.applyMiddleware({ app });

await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/graphql-auth');

app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000/graphql');
});
