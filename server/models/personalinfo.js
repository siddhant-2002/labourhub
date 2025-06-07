const mongoose = require("mongoose");

const jobHistorySchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  jobTitle: { type: String },
  jobLocation: { type: String },
  salary: { type: Number },
  jobType: { type: String },
  jobDescription: { type: String },
  skills: { type: [String] },
});

const locationschema = new mongoose.Schema({
  lat: { type: Number },
  lng: { type: Number },
});

const information = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gender: { type: String },
  email: { type: String }, // Added email field
  location: locationschema, // Added location schema
  address: { type: String }, // Added address field
  skills: { type: [String] },
  education: { type: String },
  experience: { type: String },
  jobHistory: { type: [jobHistorySchema] },
  rating: { type: Number },
  photo: { type: String },
});

module.exports = mongoose.model("PersonalInfo", information);