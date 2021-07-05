import { ApolloServer, PubSub } from 'apollo-server';

import config from './config/index.js';
import dbConn from './utils/dbcon.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

const { PORT, HOST } = config.server;

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  playground: {
    settings: {
      'editor.theme': 'dark',
    },
  },
});

const startServer = () => {
  dbConn
    .connectToDB(config.db.DB_URI)
    .then(() => {
      console.info('Successfully connected to the database');
      return server.listen(PORT, HOST);
    })
    .then(({ url }) => {
      console.info(`The server is up and running on ${url}`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

startServer();
