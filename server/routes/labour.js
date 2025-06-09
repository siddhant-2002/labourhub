/**
 * Labour Hub API Routes
 * This file contains all the API routes for the Labour Hub application
 * Routes are organized by functionality: authentication, jobs, user profiles, etc.
 */

const express = require("express");
const router = express.Router();

// Import controllers for different functionalities
const { login, signup, getuserbyid } = require("../controllers/login");
const {
  getPersonalInfoById,
  updatePersonalInfoById,
  deletePersonalInfoById,
  getallworkers,
  updatejobsbyid,
} = require("../controllers/personalinfo");
const {
  postJob,
  editJob,
  deleteJob,
  getRecommendedJobs,
  getJobByProvoiderId,
  getalljobs,
  getJobById,
} = require("../controllers/job");
const initializePersonalInfo = require("../middleware/initializePersonalInfo");
const { getRecommendations, sendSMS } = require("../controllers/recommendjobs");
const { translate } = require("../controllers/translator");
const {
  saveapplicant,
  getapplicantbyjobid,
  deleteapplicantbyjobid,
} = require("../controllers/jobhistory");

const { postLocation, getLocation } = require("../controllers/location");

// Authentication Routes
router.post("/login", login); // User login
router.post("/signup", signup, initializePersonalInfo); // User registration with personal info initialization
router.get("/user", getuserbyid); // Get user details by ID

// Personal Information Routes
router.get("/personalinfo", getPersonalInfoById); // Get user's personal information
router.put("/personalinfo", updatePersonalInfoById); // Update user's personal information
// router.delete("/personalinfo/:id", deletePersonalInfoById); // Delete user's personal information (commented out)

// Job Management Routes
router.post("/job", postJob); // Create a new job posting
router.get("/job", getJobById); // Get job details by ID
router.put("/job/:jobId", editJob); // Edit job details
router.delete("/job", deleteJob); // Delete a job posting
router.delete("/appliedjob", deleteapplicantbyjobid); // Delete a job posting

// Job Provider Routes
router.get("/jobs", getJobByProvoiderId); // Get all jobs posted by a provider
router.put("/appliedjob", updatejobsbyid); // Update job application status

// Applicant Management Routes
router.post("/saveapplicant", saveapplicant); // Save applicant details for a job
router.get("/getapplicant", getapplicantbyjobid); // Get applicant details for a specific job

// Job Listing Routes
router.get("/jobs/recommended", getRecommendedJobs); // Get recommended jobs for a user
router.get("/jobs/all", getalljobs); // Get all available jobs
router.get("/workers/all", getallworkers); // Get all registered workers

// Additional Features
router.post("/recommend", getRecommendations); // Get job recommendations
router.post("/send_sms", sendSMS); // Send SMS notifications
router.post("/translate", translate); // Handle text translation

// Location Services (commented out)
// router.post("/location",postLocation); // Update user location
// router.get('/location', getLocation); // Get user location

module.exports = router;
