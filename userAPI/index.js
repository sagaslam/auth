/* eslint-disable import/extensions */
/* eslint-disable quotes */
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Session from './session.js';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

const sessionMiddleware = (request, response, next) => {
  request.session = new Session(request, response);
  next();
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/',
  cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  }),
  bodyParser.json({ limit: '50mb' }),
  sessionMiddleware,
  cookieParser(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ session: req.session }),
  })
);

// eslint-disable-next-line no-promise-executor-return
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀  Server ready at http://localhost:4000/`);
