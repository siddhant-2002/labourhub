const info = require("../models/personalinfo");
const user = require("../models/user");

// Get personal info by user ID
const getPersonalInfoById = async (req, res) => {
  try {
    const {userId} = req.query;
    const personalInfo = await info.find({ userId });    
    console.log(userId)
    console.log(personalInfo)
    if (!personalInfo) {
      return res.status(404).json({ message: "Personal info not found" });
    }
    res.json(personalInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update personal info by ID
const updatePersonalInfoById = async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!personalInfo) {
      return res.status(404).json({ message: "Personal info not found" });
    }
    res.json(personalInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete personal info by ID
const deletePersonalInfoById = async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findByIdAndDelete(req.params.id);
    if (!personalInfo) {
      return res.status(404).json({ message: "Personal info not found" });
    }
    res.json({ message: "Personal info deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPersonalInfoById,
  updatePersonalInfoById,
  deletePersonalInfoById,
};