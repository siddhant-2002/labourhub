import React, { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Building2, MapPin, DollarSign, Clock, Users } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobProvider = () => {
  const [activeSection, setActiveSection] = useState("newJob");
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    providerId: user?.id || "",
    jobTitle: "",
    jobLocation: "",
    jobType: "",
    jobdescription: "",
    skills: "",
    salary: 0,
  });

  const [jobHistory, setJobHistory] = useState([]);

  const fetchJobHistory = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/jobs?providerId=${user.id}`
      );
      setJobHistory(response.data.reverse());
    } catch (err) {
      toast.error("Error fetching job history. Please try again.");
      console.error("error:", err);
    }
  }, [user]);

  useEffect(() => {
    if (activeSection === "jobHistory") {
      fetchJobHistory();
    }
  }, [activeSection, fetchJobHistory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()), // Convert skills to array
    };
    try {
      await axios.post("http://localhost:3000/job", dataToSend);
      toast.success("Job posted successfully!");
      setFormData({
        providerId: user?.id || "",
        jobTitle: "",
        jobLocation: "",
        jobType: "",
        jobdescription: "",
        skills: "",
        salary: 0,
      });
    } catch (err) {
      toast.error("Error posting job. Please try again.");
      console.error("error:", err);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section className="pt-10">
      <ToastContainer />
      <div className="relative pt-14">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <div className="inline-block mb-4">
                <p className="inline-flex px-4 py-2 text-base text-white border border-gray-200 rounded-full backdrop-blur-sm font-pj bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  👔 Job Provider Dashboard
                </p>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl font-pj">
                Manage Your Jobs
              </h1>
            </div>

            {/* Stats Summary */}
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Jobs</p>
                  <p className="text-lg font-semibold text-gray-900">12</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Applicants</p>
                  <p className="text-lg font-semibold text-gray-900">48</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveSection("newJob")}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all duration-200 ${
                activeSection === "newJob"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              New Job
            </button>
            <button
              onClick={() => setActiveSection("jobHistory")}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all duration-200 ${
                activeSection === "jobHistory"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Job History
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-6">
          {/* New Job Form */}
          {activeSection === "newJob" && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create New Job
                </h2>
                <p className="mt-2 text-gray-600">
                  Fill in the details to post a new job opportunity.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl border border-gray-100 p-6 space-y-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      Basic Information
                    </h3>
                    <div className="flex-1 border-b border-gray-200"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="jobTitle"
                        className="block text-sm font-bold text-gray-900 mb-2"
                      >
                        Job Title <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          id="jobTitle"
                          name="jobTitle"
                          placeholder="e.g. Construction Worker"
                          required
                          value={formData.jobTitle}
                          onChange={handleChange}
                          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 group-hover:border-gray-300"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Choose a clear and descriptive title
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="jobType"
                        className="block text-sm font-bold text-gray-900 mb-2"
                      >
                        Job Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="jobType"
                        name="jobType"
                        required
                        value={formData.jobType}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                      >
                        <option value="">Select Type</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="temporary">Temporary</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl border border-gray-100 p-6 space-y-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      Location & Compensation
                    </h3>
                    <div className="flex-1 border-b border-gray-200"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="jobLocation"
                        className="block text-sm font-bold text-gray-900 mb-2"
                      >
                        Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-gray-500 transition-colors duration-200" />
                        <input
                          type="text"
                          id="jobLocation"
                          name="jobLocation"
                          placeholder="e.g. Mumbai, Maharashtra"
                          required
                          value={formData.jobLocation}
                          onChange={handleChange}
                          className="w-full p-3 pl-10 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 group-hover:border-gray-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="salary"
                        className="block text-sm font-bold text-gray-900 mb-2"
                      >
                        Salary Range <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-gray-500 transition-colors duration-200" />
                        <input
                          type="number"
                          id="salary"
                          name="salary"
                          placeholder="e.g. ₹15000"
                          required
                          value={formData.salary}
                          onChange={handleChange}
                          className="w-full p-3 pl-10 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 group-hover:border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl border border-gray-100 p-6 space-y-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      Job Details
                    </h3>
                    <div className="flex-1 border-b border-gray-200"></div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="jobdescription"
                        className="block text-sm font-bold text-gray-900 mb-2"
                      >
                        Job Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="jobdescription"
                        name="jobdescription"
                        rows="4"
                        placeholder="Describe the main responsibilities and duties..."
                        required
                        value={formData.jobdescription}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 min-h-[120px] resize-y"
                      ></textarea>
                      <p className="mt-2 text-xs text-gray-500">
                        Include day-to-day responsibilities and expectations
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="skills"
                        className="block text-sm font-bold text-gray-900 mb-2"
                      >
                        Requirements <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="skills"
                        name="skills"
                        rows="4"
                        placeholder="List the required skills, experience, and qualifications..."
                        required
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 min-h-[120px] resize-y"
                      ></textarea>
                      <p className="mt-2 text-xs text-gray-500">
                        Specify required experience, skills, and qualifications
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Job History */}
          {activeSection === "jobHistory" && (
            <div className="space-y-4">
              {jobHistory.map((job, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {job.jobTitle}
                        </h3>
                        <span className="px-2.5 py-0.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
                          {job.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {job.jobdescription}
                      </p>
                    </div>
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{job.jobLocation}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                      <span>₹{job.salary}/month</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{job.jobType}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{job.applicants?.length || 0} Applicants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobProvider;