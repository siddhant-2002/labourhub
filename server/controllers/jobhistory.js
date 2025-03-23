const jobHistory = require("../models/jobhistory");

const updateapplicant = async (req, res) => {
  try {
    const { jobId } = req.query;
    console.log("Received jobId:", jobId);
    const data = req.body;
    console.log("Received data:", data);

    if (!jobId) {
      return res.status(400).json({ message: "jobId is required" });
    }

    const applicant = await jobHistory.findOneAndUpdate(
      { jobId },
      { $addToSet: { applicants: data } }, // Updated field name to applicants
      { new: true, runValidators: true }
    );

    console.log("Updated applicant:", applicant);

    if (!applicant) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(applicant);
  } catch (error) {
    console.error("Error updating applicant:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  updateapplicant,
};
