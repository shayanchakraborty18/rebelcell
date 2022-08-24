const mongoose = require('mongoose');

const cmspageSchema = mongoose.Schema({
  page_name: {
    type: String,
    required: true
  },
  page_content: {
    type: String,
  },
  featured_image: {
    type: String,
  }
});

module.exports = mongoose.model('Cms', cmspageSchema);