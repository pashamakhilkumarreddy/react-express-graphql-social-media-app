import mongoose from 'mongoose';
import {
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
  IN_VALID_EMAIL,
  IN_VALID_BODY,
  IN_VALID_OBJECT_ID,
} from './constants/constants.js';
import { EMAIL_REGEX } from './constants/regex.js';

export const isValidEmail = (email = '') => {
  const message = Object.seal({
    isValid: false,
    message: EMPTY_EMAIL,
  });
  if (typeof email === 'string' && email.trim()) {
    message.isValid = true;
    if (EMAIL_REGEX.test(email)) {
      return message;
    }
    message.isValid = false;
    message.message = IN_VALID_EMAIL;
    return message;
  }
  return message;
};

export const isValidPassword = (password = '') => {
  const message = Object.seal({
    isValid: false,
    message: EMPTY_PASSWORD,
  });
  if (typeof password === 'string' && password.trim()) {
    message.isValid = true;
    return message;
  }
  return message;
};

export const isValidBody = (val = '') => {
  const message = Object.seal({
    isValid: false,
    message: IN_VALID_BODY,
  });
  if (typeof val === 'string' && val.trim()) {
    message.isValid = true;
    return message;
  }
  return message;
};

export const isMongoObjectId = (id = '') => {
  const message = Object.seal({
    isValid: false,
    message: IN_VALID_OBJECT_ID,
  });
  if (id && mongoose.Types.ObjectId.isValid(id)) {
    message.isValid = true;
    return message;
  }
  return message;
};

export const validateAuthInput = (email = '', password = '') => {
  const errors = {};
  const validEmail = isValidEmail(email);
  const validPassword = isValidPassword(password);
  if (!validEmail.isValid) {
    errors.email = validEmail.message;
  }
  if (!validPassword.isValid) {
    errors.password = validPassword.message;
  }
  return errors;
};
