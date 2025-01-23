import React, { useState } from 'react';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import { useJobs } from '../../hooks/useJobs';
import { Loader } from 'lucide-react';

const RecommendedJobs = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10
  });

  const { jobs, loading, error, total } = useJobs(filters);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleLoadMore = () => {
    setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recommended Jobs</h1>
          <p className="mt-2 text-gray-600">Based on your profile and preferences</p>
        </div>

        <JobFilters onFilterChange={handleFilterChange} />

        {loading && jobs.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>

            {jobs.length < total && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-white text-primary-600 px-6 py-2 rounded-lg border-2 border-primary-600 
                           hover:bg-primary-50 transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      Loading...
                    </span>
                  ) : (
                    'Load More Jobs'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;