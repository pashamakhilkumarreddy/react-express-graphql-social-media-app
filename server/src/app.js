const { ApolloServer } = require('apollo-server');

const { PORT } = require('./config').server;
const { DB_USER, DB_PASS } = require('./config').db;
const { connectToDB } = require('./utils/db/dbcon');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

connectToDB({ dbURI: `mongodb+srv://${DB_USER}:${DB_PASS}>@firstcluster.goz45.mongodb.net/test?retryWrites=true&w=majority` }).then(async () => {
  try {
    const connected = await server.listen({
      port: PORT,
    });
    if (connected) {
      console.info(`The server is up and running on ${connected.url}`);
    }
  } catch (err) {
    console.error('Unable to connect to the server');
    console.error(err);
  }
}).catch((err) => {
  console.error('Unable to connect to the database');
  console.error(err);
});
