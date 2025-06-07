import React from "react";
import { useNavigate } from "react-router-dom";

const JobApplied = ({ job, applicant, onClose }) => {
  const navigate = useNavigate();

  // Return null if required data is missing
  if (!job || !applicant) return null;

  console.log("JobApplied applicant:", applicant);

  // If applicant is an array, render all applicants
  const applicantsArray = Array.isArray(applicant) ? applicant : [applicant];

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

        {/* Job Details Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Details</h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Job Title:</strong> {job.jobTitle}
          </p>
          <p>
            <strong>Location:</strong> {job.jobLocation?.address || "NA"}
          </p>
          <p>
            <strong>Salary:</strong>{" "}
            <span className="font-semibold text-green-600">₹{job.salary}</span>
          </p>
          <p>
            <strong>Description:</strong> {job.jobdescription}
          </p>
        </div>

        <hr className="my-4" />

        {/* Applicant Details Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Applicant Details
        </h2>
        {applicantsArray.length === 0 ? (
          <div className="text-gray-500">No applicants yet.</div>
        ) : (
          applicantsArray.map((appl, idx) => (
            <div
              key={appl._id || idx}
              className="space-y-2 text-gray-700 mb-4 border-b pb-2"
            >
              <p>
                <strong>Name:</strong> {appl.name || "N/A"}
              </p>
              <p>
                <strong>Mobile Number:</strong> {appl.phone || "N/A"}
              </p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => {
                    console.log("View Profile clicked for:", appl._id);
                    navigate(`/profile/${appl._id}`);
                  }}
                  className="px-4 py-1 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        )}

        {/* Close Button */}
        <div className="flex justify-end gap-5 items-center mt-4">
          <button className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-300">
            Reject
          </button>
          <button className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-300">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApplied;
