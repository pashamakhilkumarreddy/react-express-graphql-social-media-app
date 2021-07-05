import mongoose from 'mongoose';
import config from '../config/index.js';

const {
  DB_URI, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, OPTIONS,
} = config.db;

const getDBURI = ({
  dbURI = DB_URI,
  dbHost = DB_HOST,
  dbPort = DB_PORT,
  dbName = DB_NAME,
  dbUser = DB_USER,
  dbPassword = DB_PASS,
}) => (dbURI
  ? Promise.resolve(dbURI)
  : Promise.resolve(
    `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
  ));

const connectToDB = (dbURI) => {
  try {
    return Promise.resolve(
      mongoose.connect(dbURI, {
        ...OPTIONS,
      }),
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default {
  getDBURI,
  connectToDB,
};
