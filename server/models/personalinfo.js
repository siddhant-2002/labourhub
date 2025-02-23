const mongoose = require("mongoose");

const information = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gender: { type: String },
  address: { type: String },
  aadharcard: { type: String, unique: true },
  skills: { type: [String] },
  education: { type: String },
  experience: { type: String },
  rating: { type: Number }
});

module.exports = mongoose.model("PersonalInfo", information);
