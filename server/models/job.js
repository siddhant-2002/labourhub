/**
 * Job Model Schema
 * Defines the structure for job postings in the database
 * Includes details like title, location, salary, and required skills
 */

const mongoose = require("mongoose");

const JobLocationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: { type: String, required: true },
});

const JobSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobTitle: { type: String, required: true },
  jobLocation: { type: JobLocationSchema, required: true },
  jobType: { type: String, required: true },
  jobdescription: { type: String, required: true },
  skills: { type: [String], required: true },
  salary: { type: Number, required: true },
  status: {
    type: String,
    enum: ["active", "closed", "pending"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
