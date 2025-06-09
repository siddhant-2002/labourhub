/**
 * Job History Controller
 * Manages job application history and applicant details
 * Handles saving job applications and retrieving applicant information
 */

const jobHistory = require("../models/jobhistory");
const user = require("../models/user");

/**
 * Save applicant details for a job
 * Creates a new job history entry for the applicant
 * @param {Object} req - Request object containing applicant and job details
 * @param {Object} res - Response object
 */
const saveapplicant = async (req, res) => {
  try {
    const { userId } = req.query;
    const data = req.body;
    // console.log("data:", data);

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Check if user has already applied for any job
    const existingApplication = await jobHistory.findOne({
      userId: userId,
    });
    // console.log("existingApplication:", existingApplication);
    if (existingApplication) {
      return res.status(409).json({ message: "you already applied to a job" });
    }

    // Create a new job history entry for the applicant
    const newJobHistory = new jobHistory({
      userId: userId,
      jobId: data.jobId,
      jobTitle: data.jobTitle,
      jobLocation: data.jobLocation,
      jobType: data.jobType,
      jobdescription: data.jobdescription,
      skills: data.skills,
      salary: data.salary,
    });
    // console.log("newJobHistory:", newJobHistory);

    const savedJobHistory = await newJobHistory.save();

    res.json(savedJobHistory);
  } catch (error) {
    console.error("Error saving job history:", error);
    res.status(400).json({ message: error.message });
  }
};

const { ObjectId } = require("mongodb");

/**
 * Get applicant details for a specific job
 * Retrieves the applicant's information based on job ID
 * @param {Object} req - Request object containing job ID
 * @param {Object} res - Response object
 */
const getapplicantbyjobid = async (req, res) => {
  try {
    const { jobId } = req.query;
    // console.log("Received jobId:", jobId);

    if (!jobId) {
      return res.status(400).json({ message: "jobId is required" });
    }

    // Find job history entry for the given job ID
    const jobHistoryData = await jobHistory.findOne({
      jobId: new ObjectId(jobId),
    });
    if (!jobHistoryData) {
      return res
        .status(404)
        .json({ message: "No job history found for this jobId" });
    }

    // console.log("jobHistoryData:", jobHistoryData);

    if (!jobHistoryData.userId) {
      return res
        .status(404)
        .json({ message: "No applicants found for this job" });
    }

    const userId = jobHistoryData.userId;
    // console.log("userId:", userId);

    // Fetch applicant details from user collection
    const applicant = await user.findOne({ _id: userId });

    // console.log("getapplicantbyjobid:", applicant);

    res.json(applicant);
  } catch (error) {
    console.error("Error getting job applicants by jobId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteapplicantbyjobid = async (req, res) => {
  try {
    const { jobId } = req.query;

    if (!jobId) {
      return res.status(400).json({ message: "jobId is required" });
    }

    const { ObjectId } = require("mongodb");
    const result = await jobHistory.deleteOne({ jobId: new ObjectId(jobId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No application found for this jobId" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting applicant by jobId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  saveapplicant,
  getapplicantbyjobid,
  deleteapplicantbyjobid
};
