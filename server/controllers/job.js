const Job = require("../models/job");

// Create a new job
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

const getalljobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

// Edit an existing job
const editJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
// Delete a job
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

// Get recommended jobs (example implementation, adjust as needed)
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
  getalljobs
};