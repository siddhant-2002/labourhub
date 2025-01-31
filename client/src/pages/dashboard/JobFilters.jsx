import React, { useState } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Filter, X } from 'lucide-react';

const JobFilters = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const handleApplyFilters = () => {
    onFilterChange({
      search,
      location,
      jobType,
      salaryRange
    });
  };

  const clearFilters = () => {
    setSearch('');
    setLocation('');
    setJobType('');
    setSalaryRange('');
    onFilterChange({
      search: '',
      location: '',
      jobType: '',
      salaryRange: ''
    });
  };

  const inputClasses = "pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-200 bg-white/50";
  const selectClasses = "pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl text-gray-900 bg-white/50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-200 appearance-none";

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-6 mb-8 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className={inputClasses}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
          </div>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={selectClasses}
          >
            <option value="">Select Location</option>
            <option value="remote">Remote</option>
            <option value="onsite">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Briefcase className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
          </div>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className={selectClasses}
          >
            <option value="">Select Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
          </div>
          <select
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            className={selectClasses}
          >
            <option value="">Select Salary Range</option>
            <option value="0-30k">$0 - $30k</option>
            <option value="30k-60k">$30k - $60k</option>
            <option value="60k-100k">$60k - $100k</option>
            <option value="100k-150k">$100k - $150k</option>
            <option value="150k+">$150k+</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium group"
          >
            <Filter className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            <span>More Filters</span>
          </button>
          {(search || location || jobType || salaryRange) && (
            <button 
              onClick={clearFilters}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
              <span className="text-sm">Clear All</span>
            </button>
          )}
        </div>
        <button
          onClick={handleApplyFilters}
          className="px-8 py-3 font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Apply Filters
        </button>
      </div>

      {showMoreFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          {/* Additional filters can be added here */}
          <p className="text-sm text-gray-500">More filters coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default JobFilters;