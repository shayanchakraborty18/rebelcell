const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
  },
  company_name: {
    type: String,
  },
  telephone: {
    type: String,
  },
  message: {
    type: String,
  }
});

module.exports = mongoose.model('Contact', contactSchema);