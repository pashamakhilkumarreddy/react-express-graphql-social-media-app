import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      minlength: [6, 'Comment body is too short!'],
      required: [true, 'Comment body is required!'],
      trim: true,
    },
    username: { type: String, ref: 'users' },
  },
  {
    timestamps: true,
    strict: true,
  },
);

const LikeSchema = new Schema(
  {
    username: {
      type: String,
      ref: 'users',
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

const PostSchema = new Schema(
  {
    body: {
      type: String,
      minlength: [6, 'Post body is too short!'],
      maxlength: [240, 'Post body is too long!'],
      required: [true, 'Post body is required!'],
      trim: true,
    },
    username: {
      type: String,
      ref: 'users',
    },
    comments: [CommentSchema],
    likes: [LikeSchema],
  },
  {
    strict: true,
    timestamps: true,
  },
);

export default model('Post', PostSchema);
