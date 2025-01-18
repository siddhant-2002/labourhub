const express = require('express');
const router = express.Router();

// Controllers (you need to implement these)
const {
  login,
  signup,
  postJob,
  editJob,
  deleteJob,
  getRecommendedJobs,
  workercreateProfile,
  workereditProfile,
  providercreateProfile,
  providereditProfile,
} = require('../controllers/labourController');

// Authentication middleware (you need to implement this)
const authMiddleware = require('../middleware/authMiddleware');

// Routes
//use this for login and signup
router.post('/login', login);
router.post('/signup', signup);

//use this for posting, editing and deleting provided jobs in provider dashboard
router.post('/job', authMiddleware, postJob);
router.put('/job/:id', authMiddleware, editJob);
router.delete('/job/:id', authMiddleware, deleteJob);

//use this for getting recommended jobs for worker dashboard
router.get('/jobs/recommended', authMiddleware, getRecommendedJobs);

//use this for creating and editing profiles for worker 
router.post('/profile', authMiddleware, workercreateProfile);
router.put('/profile', authMiddleware, workereditProfile);

//use this for creating and editing profiles for provider
router.post('/provider/profile', authMiddleware, providercreateProfile);
router.put('/provider/profile', authMiddleware, providereditProfile);

module.exports = router;