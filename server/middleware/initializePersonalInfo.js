const User = require('../models/user'); // Adjust the path as necessary
const PersonalInfo = require('../models/personalinfo'); // Adjust the path as necessary

const initializePersonalInfo = async (req, res, next) => {
  try {
    const userId = req.body.userId; // Assuming userId is passed in the request body
    

    // Create a new personal info object with blank strings or default values
    const info = new PersonalInfo({
      userId: userId,
      gender: '',
      email: '',
      locatuion: '',
      skills: [],
      education: '',
      aadharcard: '',
      experience: '',
      jobHistory: [],
      rating: 0
    });

    // Save the personal info to the database
    await info.save();

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
    res.status(500).send({ error: 'Failed to initialize personal info' });
  }
};

module.exports = initializePersonalInfo;