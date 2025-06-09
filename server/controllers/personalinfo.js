const info = require("../models/personalinfo");
const user = require("../models/user");

const getallworkers = async (req, res) => {
  try {
    const workers = await user.find({ role: "worker" });
    // console.log(workers);
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get personal info by user ID
const getPersonalInfoById = async (req, res) => {
  try {
    const { userId } = req.query;
    const personalInfo = await info.find({ userId });
    // console.log(userId)
    // console.log(personalInfo)
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
    const { userId } = req.query;
    // console.log(userId);
    // console.log(req.body);
    const personalInfo = await info.findOneAndUpdate({ userId }, req.body, {
      new: true,
      runValidators: true,
    });
    // console.log(personalInfo);
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

const updatejobsbyid = async (req, res) => {
  try {
    const { userId } = req.body;
    const data = req.body;
    // console.log("Request received - userId:", userId);
    // console.log("Request body data:", data);

    const personalInfo = await info.findOneAndUpdate(
      { userId },
      { $addToSet: { jobHistory: data } },
      { new: true, runValidators: true }
    );
    // console.log("Updated personalInfo:", personalInfo);

    if (!personalInfo) {
      console.log("No personal info found for userId:", userId);
      return res.status(404).json({ message: "Personal info not found" });
    }

    res.json(personalInfo);
  } catch (error) {
    console.log("Error in updatejobsbyid:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPersonalInfoById,
  updatePersonalInfoById,
  deletePersonalInfoById,
  getallworkers,
  updatejobsbyid,
};
