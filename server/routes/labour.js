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
  createProfile,
  editProfile
} = require('../controllers/labourController');

// Authentication middleware (you need to implement this)
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/login', login);
router.post('/signup', signup);

router.post('/job', authMiddleware, postJob);
router.put('/job/:id', authMiddleware, editJob);
router.delete('/job/:id', authMiddleware, deleteJob);

router.get('/jobs/recommended', authMiddleware, getRecommendedJobs);

router.post('/profile', authMiddleware, createProfile);
router.put('/profile', authMiddleware, editProfile);

module.exports = router;