const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  post_title: {
    type: 'String',
    required: true
  },
  post_name: {
    type: 'String',
  },
  post_content: {
    type: 'String',
  },
  post_author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  featured_image: {
    type: 'String',
  },
  post_status: {
    type: 'String',
    default: 'publish',
    enum: {
      values: [
          'publish',
          'draft',
          'private'
      ],
    }
  },
  post_date: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'posts' });

module.exports = mongoose.model('Post', postSchema);