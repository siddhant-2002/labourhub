const mongoose = require("mongoose");

const appliedJobsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobTitle: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobType: { type: String, required: true },
  jobdescription: { type: String, required: true },
  skills: { type: [String], required: true },
  salary: { type: Number, required: true },
});

const AppliedJobs = mongoose.model("AppliedJobs", appliedJobsSchema);

module.exports = AppliedJobs;
