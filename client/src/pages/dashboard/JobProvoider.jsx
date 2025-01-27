import React, { useState } from 'react';

const JobProvider = () => {
  const [activeSection, setActiveSection] = useState('addJob');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Job Provider Dashboard</h2>
        
        {/* Buttons to switch between sections */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveSection('addJob')}
            className={`px-4 py-2 rounded-lg ${activeSection === 'addJob' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Add Job
          </button>
          <button
            onClick={() => setActiveSection('jobHistory')}
            className={`px-4 py-2 rounded-lg ${activeSection === 'jobHistory' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Job History
          </button>
        </div>

        {/* Job Adding Section */}
        {activeSection === 'addJob' && (
          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">Add a Job</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="jobTitle" className="block text-lg font-medium mb-2">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="jobDescription" className="block text-lg font-medium mb-2">Job Description</label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  rows="4"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="jobLocation" className="block text-lg font-medium mb-2">Job Location</label>
                <input
                  type="text"
                  id="jobLocation"
                  name="jobLocation"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Job
              </button>
            </form>
          </section>
        )}

        {/* Job History Section */}
        {activeSection === 'jobHistory' && (
          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">Job History</h3>
            <div className="space-y-4">
              {/* Example job history item */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-lg font-medium">Job Title Example</h4>
                <p className="text-gray-600">Job Description Example</p>
                <p className="text-gray-600">Location: Example Location</p>
                <p className="text-gray-600">Date: Example Date</p>
              </div>
              {/* Add more job history items here */}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default JobProvider;