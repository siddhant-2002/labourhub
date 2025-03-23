const express = require("express");
const router = express.Router();

// Controllers (you need to implement these)
const { login, signup } = require("../controllers/login");
const {
  getPersonalInfoById,
  updatePersonalInfoById,
  deletePersonalInfoById,
  getallworkers,
  updatejobsbyid
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
const {updateapplicant} = require("../controllers/jobhistory")

// Routes
//use this for login and signup
router.post("/login", login);
router.post("/signup", signup, initializePersonalInfo);

//personal info
router.get("/personalinfo", getPersonalInfoById);
router.put("/personalinfo", updatePersonalInfoById);
// router.delete("/personalinfo/:id", deletePersonalInfoById);

//use this for posting, editing and deleting provided jobs in provider dashboard
router.post("/job", postJob);
router.get("/job", getJobById);
// router.put('/job/:id',  editJob);
// router.delete('/job/:id', deleteJob);

//use this for getting jobs by provider ID
router.get("/jobs", getJobByProvoiderId);

router.put("/appliedjob",updatejobsbyid)

router.put("/updateapplicant", updateapplicant);

// //use this for getting recommended jobs for worker dashboard
router.get("/jobs/recommended", getRecommendedJobs);
router.get("/jobs/all", getalljobs);
router.get("/workers/all", getallworkers);

//use this for getting recommended jobs for worker dashboard
router.post("/recommend", getRecommendations);
router.post("/send_sms", sendSMS);

router.post("/translate", translate);

module.exports = router;
