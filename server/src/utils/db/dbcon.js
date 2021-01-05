const mongoose = require('mongoose');
const {
  DB_HOST, DB_PORT, DB_USER, DB_PASS,
} = require('../../config').db;

const getDBURI = ({
  dbHost = DB_HOST,
  dbPort = DB_PORT,
  dbUser = DB_USER,
  dbPass = DB_PASS,
  dbName,
}) => Promise.resolve(`mongodb://${dbHost}:${dbPort}/${dbName}/${dbUser}${dbPass}`);

const connectToDB = ({ dbURI, dbUser = DB_USER, dbPass = DB_PASS }) => {
  try {
    const mongoOptions = {
      user: dbUser,
      pass: dbPass,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    return Promise.resolve(mongoose.connect(dbURI, mongoOptions));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getDBURI,
  connectToDB,
};
