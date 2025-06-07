/**
 * Job Controller
 * Handles all job-related operations including CRUD operations and job recommendations
 */

const Job = require("../models/job");

/**
 * Create a new job posting
 * @param {Object} req - Request object containing job details
 * @param {Object} res - Response object
 */
const postJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    // console.log(job)
    await job.save();

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get all available jobs
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getalljobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

/**
 * Edit an existing job posting
 * @param {Object} req - Request object containing job ID and updated details
 * @param {Object} res - Response object
 */
const editJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get all jobs posted by a specific provider
 * @param {Object} req - Request object containing provider ID
 * @param {Object} res - Response object
 */
const getJobByProvoiderId = async (req, res) => {
  const { providerId } = req.query;
  try {
    const jobs = await Job.find({ providerId });
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching jobs by provider ID" });
  }
};

/**
 * Delete a job posting
 * @param {Object} req - Request object containing job ID
 * @param {Object} res - Response object
 */
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get job details by ID
 * @param {Object} req - Request object containing job ID
 * @param {Object} res - Response object
 */
const getJobById = async (req, res) => {
  try {
    const { jobId } = req.query;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get recommended jobs based on user skills
 * @param {Object} req - Request object containing user skills
 * @param {Object} res - Response object
 */
const getRecommendedJobs = async (req, res) => {
  try {
    const { skills } = req.query;
    const skillArray = skills ? skills.split(",") : [];
    const jobs = await Job.find({ skills: { $in: skillArray } });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postJob,
  editJob,
  deleteJob,
  getRecommendedJobs,
  getJobByProvoiderId,
  getalljobs,
  getJobById,
};
