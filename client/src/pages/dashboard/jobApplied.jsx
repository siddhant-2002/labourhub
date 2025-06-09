import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobApplied = ({ job, applicant, onClose, onUpdate, status }) => {
  const navigate = useNavigate();

  if (!job || !applicant) return null;

  const handleApplication = async (status) => {
    try {
      const baseUrl = "http://localhost:3000";

      if (status === "accepted") {
        // Update job application status
        // console.log("applicant", applicant)
        await axios.put(`${baseUrl}/appliedjob`, {
          userId: applicant._id,
          jobId: job._id,
          jobTitle: job.jobTitle,
          jobLocation: job.jobLocation?.address || "N/A",
          salary: job.salary,
          jobType: job.jobType,
          jobdescription: job.jobdescription,
          skills: job.skills,
        });

        // Update job status
        await axios.put(`${baseUrl}/job/${job._id}`, {
          status: "accepted",
        });

        // await axios.delete(`${baseUrl}/appliedjob?jobId=${job._id}`);
      } else {
        // Delete job application
        

        // Reset job status
        await axios.put(`${baseUrl}/job?jobId=${job._id}`, {
          status: "pending",
        });
      }

      if (onUpdate) await onUpdate();
      onClose();
    } catch (error) {
      console.error("Error handling job application:", error);
      // You might want to add a toast notification here
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Job Details */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Details</h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Job Title:</strong> {job.jobTitle}
            </p>
            <p>
              <strong>Location:</strong> {job.jobLocation?.address || "N/A"}
            </p>
            <p>
              <strong>Salary:</strong>{" "}
              <span className="font-semibold text-green-600">
                ₹{job.salary}
              </span>
            </p>
            <p>
              <strong>Description:</strong> {job.jobdescription}
            </p>
            {status && (
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    status === "accept" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {status === "accept" ? "Accepted" : "Pending"}
                </span>
              </p>
            )}
          </div>
        </section>

        <hr className="my-4" />

        {/* Applicant Details */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Applicant Details
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {applicant.name || "N/A"}
            </p>
            <p>
              <strong>Mobile Number:</strong> {applicant.phone || "N/A"}
            </p>
            <button
              onClick={() => navigate(`/profile/${applicant._id}`)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
            >
              View Profile
            </button>
          </div>
        </section>

        {/* Action Buttons - Only show if job is not accepted */}
        {status !== "accept" && (
          <div className="flex justify-end gap-4 items-center mt-6">
            <button
              onClick={() => handleApplication("accepted")}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
            >
              Accept
            </button>
            <button
              onClick={() => handleApplication("rejected")}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplied;
