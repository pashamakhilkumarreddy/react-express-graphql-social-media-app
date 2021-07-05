import dotenv from 'dotenv';

dotenv.config();

const config = {
  ENV: process.env.NODE_ENV || 'development',
  server: {
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 5000,
  },
  db: {
    DB_URI: process.env.DB_URI,
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_NAME: process.env.DB_NAME || 'research',
    DB_USER: process.env.DB_USER || 'admin',
    DB_PASS: process.env.DB_PASS || 'bL1cSOz1+UwCxO0PVoi7Mg',
    OPTIONS: {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
  },
  redis: {
    PORT: process.env.REDIS_PORT || 6379,
    HOST: process.env.REDIS_HOST || '127.0.0.1',
    PASSWORD: process.env.REDIS_PASSWORD || 'ZMWTWdU8QaThhBWKmR+71w',
  },
  jwt: {
    JWT_ISSUER: process.env.JWT_ISSUER || 'johndoe',
    JWT_SECRET:
      process.env.JWT_SECRET || 'rNKPEa2/3NVnBtLrbNrZHNyawHTVaVWBINA6jrvf0sM=',
    JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY || '50m',
    JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY || '30d',
  },
};

export default config;
