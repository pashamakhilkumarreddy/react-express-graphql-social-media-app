require('dotenv').config();

module.exports = {
  server: {
    PORT: process.env.PORT || 5000,
  },
  db: {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 27017,
    DB_USER: process.env.DB_USER || 'admin',
    DB_PASS: process.env.DB_PASS || 'Dyxrak6kwgcFn62a',
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET || 'C2o/pSl9QZHhGZ+c5BKXKJvQKo/0GzFdg1LZdXdQp9E=',
    JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY || '30d',
    JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY || '15m',
    JWT_ISSUER: process.env.JWT_ISSUER || 'johndoe',
  },
};
