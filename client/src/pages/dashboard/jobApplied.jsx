import React from "react";
import { useNavigate } from "react-router-dom";

const JobApplied = ({ job, applicant, onClose }) => {
  const navigate = useNavigate();

  if (!job || !applicant) return null;

  const handleViewProfile = () => {
    navigate(`/profile?userId=${applicant._id}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Job Details */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Details</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Job Title:</strong> {job.jobTitle}</p>
          <p><strong>Location:</strong> {job.jobLocation}</p>
          <p><strong>Salary:</strong> <span className="font-semibold text-green-600">₹{job.salary}</span></p>
          <p><strong>Description:</strong> {job.jobdescription}</p>
        </div>

        <hr className="my-4" />

        {/* Applicant Details */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Applicant Details</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Name:</strong> {applicant.name || "N/A"}</p>
          <p><strong>Mobile Number:</strong> {applicant.phone || "N/A"}</p>
        </div>

        <div className="flex justify-between items-center mt-6">
          {/* View Profile Button */}
          <button
            onClick={handleViewProfile}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            View Profile
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApplied;
