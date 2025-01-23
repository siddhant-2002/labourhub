import React from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobCard = ({
  title,
  company,
  location,
  salary,
  type,
  postedDate,
  description,
  imageUrl,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    // Logic to apply for the job goes here

    // Show toaster notification
    toast.success('Applied for job successfully');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={company}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
          {type}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 font-medium mb-4">{company}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>{salary}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>{postedDate}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <button
            onClick={handleClick}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Apply Now
          </button>
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            Save Job
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobCard;