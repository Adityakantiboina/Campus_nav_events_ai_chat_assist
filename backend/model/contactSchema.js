const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Adjust the regex to your needs (e.g., to support other formats)
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', contactSchema);
