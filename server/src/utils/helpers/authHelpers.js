import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

// eslint-disable-next-line import/prefer-default-export
export const isUserAuthenticated = (context) => {
  try {
    return new Promise((resolve, reject) => {
      const authHeader = context.req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
          const user = jwt.verify(token, config.jwt.JWT_SECRET);
          resolve(user);
        }
        reject(new AuthenticationError('Invalid/Expired Token'));
      }
      reject(
        new Error(
          'Authentication token must be provided in the form of \'Bearer [token]\'',
        ),
      );
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
