import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Briefcase, BookmarkPlus, BookmarkCheck, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobCard = ({
  title,
  company,
  location,
  salary,
  type,
  postedDate,
  description,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    toast.success('Applied for job successfully');
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Job removed from saved jobs' : 'Job saved successfully');
  };

  const handleShare = async (e) => {
    e.preventDefault();
    try {
      await navigator.share({
        title: `${title} at ${company}`,
        text: description,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg group">
      {/* Grid background with gradient fade */}
      <div className="absolute inset-0  transition-opacity">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:14px_14px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white" style={{ top: '15%' }}></div>
      </div>

      <div className="relative p-6">
        {/* Job Type Badge */}
        <div className="inline-block mb-4">
          <span className="inline-flex px-3 py-1 text-sm text-white rounded-full backdrop-blur-sm bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-medium">
            {type}
          </span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 font-pj">
              {title}
            </h3>
            <p className="text-base text-gray-600 font-medium font-inter">
              {company}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              title="Share job"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleSave}
              className={`p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 ${
                isSaved ? 'text-gray-900' : ''
              }`}
              title={isSaved ? 'Remove from saved jobs' : 'Save job'}
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <BookmarkPlus className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm font-inter">{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-sm font-inter">{salary}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Briefcase className="w-4 h-4 mr-2" />
            <span className="text-sm font-inter">{type}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm font-inter">{postedDate}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-base leading-7 mb-6 line-clamp-2 font-inter">
          {description}
        </p>

        {/* Action Button */}
        <button
          onClick={handleApply}
          className="w-full px-6 py-3 text-lg font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;