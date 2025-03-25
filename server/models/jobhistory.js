const mongoose = require("mongoose");

const jobHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  jobTitle: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobType: { type: String, required: true },
  jobdescription: { type: String, required: true },
  skills: { type: [String], required: true },
  salary: { type: Number, required: true },
});

const JobHistory = mongoose.model("JobHistory", jobHistorySchema);

module.exports = JobHistory;
