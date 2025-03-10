import React, { useState,useContext } from 'react';
import JobCard from './JobCard';
import { useJobs } from '../../hooks/useJobs';
import { useRecommendedJobs } from '../../hooks/useRecommendedJobs';
import { Loader, Search, Briefcase, TrendingUp } from 'lucide-react';
import { AuthContext } from "../../context/AuthContext";



const RecommendedJobs = () => {

  const [activeTab, setActiveTab] = useState('recommended');

   const { user } = useContext(AuthContext);
   const userId = user ? user.id : null;


  const { jobs, loading, error, total } = useJobs();
  const { jobs: recommendedJobs, loading: recLoading } = useRecommendedJobs(userId);
  
  if (error) {
    return (
      <section className="relative pt-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
            <p className="text-red-600 font-medium">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-8 py-4 text-lg font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-10">
      <div className="relative pt-14">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-xl opacity-20"></div>
                <h2 className="relative text-4xl font-bold text-gray-900">
                  Find Your Next Job
                </h2>
              </div>
              <p className="mt-2 text-base leading-7 text-gray-600 font-inter">
                Discover opportunities that match your skills
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Briefcase className="w-5 h-5" />
                <span className="font-medium">{total} Jobs Available</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Updated Today</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('recommended')}
                className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all duration-200 ${
                  activeTab === 'recommended'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Recommended Jobs
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all duration-200 ${
                  activeTab === 'all'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                All Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-8">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-200"
                placeholder="Search jobs by title, company, or keywords..."
              />
            </div>
            
          </div>

          {activeTab === 'recommended' ? (
            recLoading && recommendedJobs.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-64">
                <Loader className="w-10 h-10 animate-spin text-gray-900 mb-4" />
                <p className="text-gray-600 font-medium">Finding the best matches for you...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedJobs.map((job) => (
                  <JobCard key={job._id} {...job} />
                ))}
                
                {recommendedJobs.length === 0 && (
                  <div className="text-center py-12 col-span-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600">Try adjusting your search filters or try again later.</p>
                  </div>
                )}
              </div>
            )
          ) : (
            loading && jobs.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-64">
                <Loader className="w-10 h-10 animate-spin text-gray-900 mb-4" />
                <p className="text-gray-600 font-medium">Finding the best matches for you...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map((job) => (
                  <JobCard key={job._id} {...job} />
                ))}
                
                {jobs.length < total && (
                  <div className="mt-12 flex justify-center col-span-full">
                    <button
                      
                      disabled={loading}
                      className="px-8 py-4 text-lg font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <Loader className="w-5 h-5 animate-spin mr-2" />
                          Loading more jobs...
                        </span>
                      ) : (
                        'Load More Jobs'
                      )}
                    </button>
                  </div>
                )}

                {jobs.length === 0 && (
                  <div className="text-center py-12 col-span-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600">Try adjusting your search filters or try again later.</p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default RecommendedJobs;