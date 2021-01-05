const { Schema, model } = require('mongoose');
const { sign } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { toDate } = require('date-fns');

const {
  JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRY, JWT_REFRESH_TOKEN_EXPIRY, JWT_ISSUER,
} = require('../config').jwt;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    index: true,
    validate: {
      validator(val) {
        // eslint-disable-next-line no-useless-escape, max-len
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(val);
      },
      message: ({
        value,
      }) => `${value} is not a valid email address`,
    },
    minlength: [5, 'Email is too short'],
    maxlength: [120, 'Email is too long'],
    trim: true,
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
    minlength: [5, 'Username is too short'],
    maxlength: [120, 'Username is too long'],
    trim: true,
    required: [true, 'Username is required!'],
    default: uuidv4(),
  },
  password: {
    type: String,
    minlength: [8, 'Password is too short'],
    trim: true,
    required: [true, 'password is required!'],
  },
  gender: {
    type: String,
    trim: true,
    lowercase: true,
    enum: ['female', 'male', 'others', 'null'],
    default: 'null',
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
  },
  refererCode: {
    type: String,
  },
}, {
  timestamps: true,
  strict: true,
});

UserSchema.pre('save', async function hashPassword(next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const hashedPassword = await hash(this.password, 12);
      this.password = hashedPassword;
      return next();
    }
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

UserSchema.methods.comparePassword = async function comparePassword(password) {
  try {
    return await compare(password, this.password);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

UserSchema.methods.genRefreshToken = async function genRefreshToken() {
  try {
    const payload = {
      id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    };
    const token = sign(payload, JWT_SECRET, {
      algorithm: 'HS384',
      expiresIn: JWT_REFRESH_TOKEN_EXPIRY,
      issuer: JWT_ISSUER,
    });
    return token;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

UserSchema.methods.genAccessToken = async function genAccessToken() {
  try {
    const payload = {
      id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    };
    const token = sign(payload, JWT_SECRET, {
      algorithm: 'HS384',
      expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
      issuer: JWT_ISSUER,
    });
    return token;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

UserSchema.methods.formattedUserObj = async function formattedUserObj() {
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
  const formattedObj = {
    ...rest,
  };
  return formattedObj;
};

module.exports = model('User', UserSchema);
