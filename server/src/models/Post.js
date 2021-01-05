const { Schema, model } = require('mongoose');
const { toDate } = require('date-fns');

const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  content: {
    type: String,
    minlength: [3, 'Content is too short'],
    trim: true,
    required: [true, 'Content is required!'],
  },
  comments: [
    {
      content: {
        type: String,
        minlength: [3, 'Content is too short'],
        trim: true,
        required: [true, 'Content is required!'],
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      createdAt: {
        type: Date,
        default: toDate(new Date()),
      },
    },
  ],
  likes: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      createdAt: {
        type: Date,
        default: toDate(new Date()),
      },
    },
  ],
}, {
  timestamps: true,
  strict: true,
});

module.exports = model('Post', PostSchema);
