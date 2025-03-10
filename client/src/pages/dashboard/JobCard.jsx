import React, { useState } from 'react';
import { MapPin, DollarSign, Share2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobPopup from './JobPopup';

const JobCard = ({
  jobTitle,
  jobLocation,
  salary,
  jobType,
  jobDescription,
  skills
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    toast.success('Applied for job successfully');
  };

  const handleShare = async (e) => {
    e.preventDefault();
    try {
      await navigator.share({
        title: jobTitle,
        text: jobDescription,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handleViewJob = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <ToastContainer />
      {/* Grid background with gradient fade */}
      <div className="absolute inset-0  transition-opacity">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:14px_14px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white" style={{ top: '15%' }}></div>
      </div>

      <div className="relative p-6">
        {/* Job Type Badge */}
        <div className="inline-block mb-4">
          <span className="inline-flex px-3 py-1 text-sm text-white rounded-full backdrop-blur-sm bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-medium">
            {jobType}
          </span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 font-pj">
              {jobTitle}
            </h3>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              title="Share job"
            >
              <Share2 className="w-5 h-5" />
            </button>
            
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm font-inter">{jobLocation}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-sm font-inter">{salary}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-base leading-7 mb-6 line-clamp-2 font-inter">
          {jobDescription}
        </p>

        {/* Action Button */}
        <div className='flex space-x-4'>
          <button
            onClick={handleApply}
            className="w-full px-6 py-3 text-lg font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            Apply Now
          </button>
          <button
            onClick={handleViewJob}
            className="w-full px-6 py-3 text-lg font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            View Job
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <JobPopup
          jobTitle={jobTitle}
          jobLocation={jobLocation}
          jobType={jobType}
          jobDescription={jobDescription}
          skills={skills}
          salary={salary}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default JobCard;