import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";
import { MapPin, Mail, Phone, Award, Clock, Camera, Save, Edit2, X } from "lucide-react";

/**
 * WorkerProfile Component
 * Displays and manages a worker's profile information including:
 * - Personal details (name, location, contact)
 * - Skills
 * - Work experience
 * - Job history
 */
const WorkerProfile = () => {
  // Initial state for profile data
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
    skills: [],
    experience: "",
    jobHistory: [],
    photo: ""
  });
  
  // State for managing edit mode and form data
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch profile data from the server
  const fetchProfileData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setError("User not logged in.");
      return;
    }

    const userId = user._id || user.id;
    
    if (!userId) {
      setLoading(false);
      setError("Invalid user data.");
      return;
    }

    try {
      const response = await axios.get(`/personalinfo?userId=${userId}`);
      const profileData = Array.isArray(response.data) ? response.data[0] : response.data;
      
      // Combine user auth data with profile data
      const formattedProfile = {
        name: user?.name || "",        // Name from auth
        location: profileData?.location || "",
        email: profileData?.email || "",
        phone: user?.phone || "",      // Phone from auth
        skills: profileData?.skills || [],
        experience: profileData?.experience || "",
        jobHistory: profileData?.jobHistory || [],
        photo: profileData?.photo || ""
      };

      setProfile(formattedProfile);
      setEditedProfile(formattedProfile);
      setLoading(false);
    } catch (err) {
      setError("Failed to load profile information.");
      setLoading(false);
    }
  }, [user]);

  // Load profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle skills input with comma separation
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value ? e.target.value.split(",").map(skill => skill.trim()) : [];
    setEditedProfile(prev => ({
      ...prev,
      skills: skillsArray
    }));
  };

  // Save profile changes to the server
  const handleSave = async () => {
    try {
      setLoading(true);
      const userId = user._id || user.id;
      await axios.put(`/personalinfo/${userId}`, editedProfile);
      setProfile(editedProfile);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle edit mode and handle cancel
  const toggleEditMode = () => {
    if (editMode) {
      // Reset edited profile to current profile when canceling
      setEditedProfile(profile);
    }
    setEditMode(!editMode);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  // Use edited profile in edit mode, otherwise use current profile
  const displayProfile = editMode ? editedProfile : profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          <div className="relative px-6 pb-6">
            {/* Edit Toggle Button */}
            <button
              onClick={toggleEditMode}
              className={`absolute top-4 right-4 p-2 rounded-full ${
                editMode ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              {editMode ? <X size={20} /> : <Edit2 size={20} />}
            </button>

            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative -mt-16 mb-4 sm:mb-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                  <img
                    src={displayProfile.photo || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {editMode && (
                    <button 
                      className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
                      onClick={() => {/* Add photo upload handler */}}
                    >
                      <Camera size={16} />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left sm:ml-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  {displayProfile.name || "Your Name"}
                </h1>
                <div className="mt-2 flex flex-wrap gap-4 justify-center sm:justify-start">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{displayProfile.location || "Add your location"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{displayProfile.email || "Add your email"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{displayProfile.phone || "Add your phone"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Profile Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={displayProfile.name}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                      : 'border-transparent bg-gray-50'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={displayProfile.location}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                      : 'border-transparent bg-gray-50'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={displayProfile.email}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                      : 'border-transparent bg-gray-50'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={displayProfile.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                      : 'border-transparent bg-gray-50'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Job History */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Job History</h2>
              <div className="space-y-6">
                {displayProfile.jobHistory && displayProfile.jobHistory.length > 0 ? (
                  displayProfile.jobHistory.map((job, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">{job.projectName}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {job.duration}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-600">
                          <Award className="w-4 h-4 mr-2" />
                          <span>{job.role}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No job history available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add or update your skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={displayProfile.skills?.join(", ")}
                  onChange={handleSkillsChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                    : 'border-transparent bg-gray-50'
                  }`}
                  placeholder="e.g., Plumbing, Electrical, Carpentry"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {displayProfile.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Experience</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={displayProfile.experience}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    editMode ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                    : 'border-transparent bg-gray-50'
                  }`}
                  placeholder="e.g., 5 years"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button - Only show when in edit mode */}
        {editMode && (
          <div className="fixed bottom-8 right-8">
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerProfile;