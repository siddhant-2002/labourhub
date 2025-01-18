const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  jobListings: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      requirements: {
        type: [String],
        required: true,
      },
      salary: {
        type: Number,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      datePosted: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const user = mongoose.model('user', userSchema);

module.exports = user;