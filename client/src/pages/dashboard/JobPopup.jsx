/**
 * JobPopup Component
 * Displays detailed information about a job in a modal popup
 * Includes job details, location, salary, and skills required
 */

import React from "react";
import { MapPin, DollarSign, Briefcase } from "lucide-react";
// import LocationMap from '../profiles/LocationMap'; // Adjust the import path as necessary

const JobPopup = ({
  jobTitle, // Title of the job position
  jobLocation, // Location details of the job
  jobType, // Type of employment
  jobdescription, // Detailed description of the job
  skills, // Required skills for the position
  salary, // Salary/compensation for the position
  onClose, // Function to close the popup
}) => {
  /**
   * Opens the job location in Google Maps
   */
  const handleViewOnMap = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      jobLocation?.address || jobLocation || "N/A"
    )}`;
    window.open(mapUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        {/* Job Title */}
        <h2 className="text-2xl font-bold mb-4">{jobTitle}</h2>

        {/* Job Type Badge */}
        <div className="mb-4">
          <span className="inline-flex px-3 py-1 text-sm text-white rounded-full backdrop-blur-sm bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-medium">
            {jobType}
          </span>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Location */}
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm font-inter">
              {jobLocation?.address || jobLocation || "N/A"}
            </span>
          </div>

          {/* Salary */}
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-sm font-inter">{salary}</span>
          </div>

          {/* Required Skills */}
          <div className="flex items-center text-gray-600 col-span-2">
            <Briefcase className="w-4 h-4 mr-2" />
            <span className="text-sm font-inter">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* Job Description */}
        <p className="text-gray-600 text-base leading-7 mb-6 font-inter">
          {jobdescription}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleViewOnMap}
            className="px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all duration-200"
          >
            View on Map
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 text-lg font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPopup;
