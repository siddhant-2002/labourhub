const mongoose = require("mongoose");

const information = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gender: { type: String },
  email: { type: String }, // Added email field
  location: { type: String },
  address: { type: String },
  aadharcard: { type: String, unique: true },
  skills: { type: [String] },
  education: { type: String },
  experience: { type: String },
  jobHistory: { type: [String] }, // Added jobHistory field
  rating: { type: Number },
  photo: { type: String },
});

module.exports = mongoose.model("PersonalInfo", information);