import mongoose from 'mongoose';
import { toDate } from 'date-fns';
import uuid from 'uuid';
import { nanoid } from 'nanoid';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import constants from '../utils/constants/index.js';
import config from '../config/index.js';

const {
  JWT_ISSUER,
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_EXPIRY,
} = config.jwt;

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Name is too short!'],
      maxlength: [27, 'Name is too long!'],
      required: false,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      index: true,
      validate: {
        validator(val) {
          return constants.EMAIL_REGEX.test(val);
        },
        message: ({ value }) => `${value} is not a valid email address`,
      },
      minlength: [3, 'Email is too short!'],
      maxlength: [120, 'Email is too long!'],
      required: [true, 'Email is required!'],
      trim: true,
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      minlength: [3, 'Username is too short!'],
      maxlength: [120, 'Username is too long!'],
      required: [true, 'Username is required!'],
      trim: true,
      default: uuid.v4(),
    },
    password: {
      type: String,
      minlength: [6, 'Password is too short!'],
      maxlength: [240, 'Password is too long!'],
      required: [true, 'Password is required!'],
    },
    mobile: {
      type: String,
      minlength: [6, 'Mobile number is too short!'],
      maxlength: [15, 'Mobile number is too long!'],
      required: false,
      trim: true,
    },
    gender: {
      type: String,
      lowercase: true,
      enum: ['female', 'male', 'others', ''],
      default: '',
      required: false,
      trim: true,
    },
    dob: {
      type: Date,
    },
    doj: {
      type: Date,
      default: toDate(new Date()),
    },
    isAdmin: {
      type: Boolean,
      default: false,
      select: false,
    },
    isUserVerified: {
      type: Boolean,
      default: false,
      select: false,
    },
    isUserPremium: {
      type: Boolean,
      default: false,
      select: false,
    },
    isUserArchived: {
      type: Boolean,
      default: false,
      select: false,
    },
    lastLogin: {
      type: Date,
    },
    referralCode: {
      type: String,
      default: nanoid(),
    },
    refererCode: {
      type: String,
      required: false,
    },
  },
  {
    strict: true,
    timestamps: true,
  },
);

UserSchema.pre('save', async function hashPassword(next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const hashedPassword = await bcryptjs.hash(this.password, 12);
      this.password = hashedPassword;
      return next();
    }
    return true;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(password) {
  try {
    return await bcryptjs.compare(password, this.password);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

UserSchema.methods.genRefreshToken = function genRefreshToken() {
  try {
    const payload = {
      id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    };
    const token = jwt.sign(payload, JWT_SECRET, {
      algorithm: 'HS384',
      expiresIn: JWT_REFRESH_TOKEN_EXPIRY,
      issuer: JWT_ISSUER,
    });
    return token;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

UserSchema.methods.genAccessToken = function genAccessToken() {
  try {
    const payload = {
      id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    };
    const token = jwt.sign(payload, JWT_SECRET, {
      algorithm: 'HS384',
      expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
      issuer: JWT_ISSUER,
    });
    return token;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

UserSchema.methods.formattedUserObj = function formattedUserObj() {
  const obj = this.toObject({
    virtuals: true,
  });
  const {
    _id,
    password,
    isUserArchived,
    isUserVerified,
    isUserPremium,
    createdAt,
    updatedAt,
    __v,
    ...rest
  } = obj;
  const userObj = {
    ...rest,
  };
  return userObj;
};

export default model('User', UserSchema);
