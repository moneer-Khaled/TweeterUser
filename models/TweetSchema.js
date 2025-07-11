const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [20, 'Title must be at least 20 characters'],
  },
  tweet: {
    type: String,
    required: [true, 'Tweet is required'],
    maxlength: [50, 'Tweet cannot exceed 50 characters'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Tweet', TweetSchema);
