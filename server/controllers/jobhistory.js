const jobHistory = require("../models/jobhistory");

const saveapplicant = async (req, res) => {
  try {
    const { userId } = req.query;
    // console.log("Received userId:", userId);
    const data = req.body;
    // console.log("Received data:", data);

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
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
      salary: data.salary
    });

    const savedJobHistory = await newJobHistory.save();

    // console.log("Saved job history:", savedJobHistory);

    res.json(savedJobHistory);
  } catch (error) {
    console.error("Error saving job history:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  saveapplicant,
};