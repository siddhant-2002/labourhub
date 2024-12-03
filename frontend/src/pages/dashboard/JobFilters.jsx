import React, { useState } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Filter } from 'lucide-react';

const JobFilters = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState('');

  const handleApplyFilters = () => {
    onFilterChange({
      search,
      location,
      jobType,
      salaryRange
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
          >
            <option value="">Location</option>
            <option value="remote">Remote</option>
            <option value="onsite">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Briefcase className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
          >
            <option value="">Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
          >
            <option value="">Salary Range</option>
            <option value="0-30k">$0 - $30k</option>
            <option value="30k-60k">$30k - $60k</option>
            <option value="60k-100k">$60k - $100k</option>
            <option value="100k+">$100k+</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <Filter className="h-5 w-5" />
            <span>More Filters</span>
          </button>
        </div>
        <button
          onClick={handleApplyFilters}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg 
                   hover:bg-primary-700 transition-colors duration-200"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilters;