const User = require('../models/user'); // Adjust the path as necessary
const PersonalInfo = require('../models/personalinfo'); // Adjust the path as necessary

const initializePersonalInfo = async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming userId is passed in the request body
    console.log('User ID:', userId);

    if (!userId) {
      return res.status(400).send({ error: 'User ID is required' });
    }

    // Create a new personal info object with blank strings or default values
    const info = new PersonalInfo({
      userId: userId,
      gender: '',
      email: '',
      location: '',
      address: '',
      aadharcard: req.body.aadharcard && req.body.aadharcard.trim() !== "" ? req.body.aadharcard : null,
      skills: [],
      education: '',
      experience: '',
      jobHistory: [],
      rating: 0,
      photo: ''
      
    });
    console.log('Personal Info:', info);

    // Save the personal info to the database
    await info.save();
    console.log("personal info saved")

    // Check if req.newUser is set
    if (!req.newUser) {
      return res.status(500).send({ error: 'New user information is not available' });
    }

    // Send response after middleware has been executed
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: req.newUser._id,
        name: req.newUser.name,
        role: req.newUser.role,
      },
    });
  } catch (error) {
    console.error('Error initializing personal info:', error);
    res.status(500).send({ error: 'Failed to initialize personal info' });
  }
};

module.exports = initializePersonalInfo;