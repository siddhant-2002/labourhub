const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
});

const jobHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  jobTitle: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobType: { type: String, required: true },
  jobdescription: { type: String, required: true },
  skills: { type: [String], required: true },
  salary: { type: Number, required: true },
  applicants: {
    type: [applicantSchema], // Changed to an array of applicantSchema
    default: [] // Default to an empty array
  }
});

const JobHistory = mongoose.model("JobHistory", jobHistorySchema);

module.exports = JobHistory;