import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";
import {
  MapPin,
  Mail,
  Phone,
  Award,
  Clock,
  Camera,
  Save,
  Edit2,
  X,
  Briefcase,
  BookOpen,
  CreditCard,
  User,
  Calendar,
  Star,
} from "lucide-react";

/**
 * Enhanced WorkerProfile Component
 * Displays and manages a worker's profile information including:
 * - Personal details (name, location, contact, gender)
 * - Identity documents (Aadhar card)
 * - Educational background
 * - Skills
 * - Work experience
 * - Job history
 * - Ratings
 */
const ProvoiderProfile = () => {
  // Initial state for profile data
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    gender: "",
    email: "",
    address: "",
    location: "",
    skills: [],
    education: "",
    aadharcard: "",
    experience: "",
    jobHistory: [],
    rating: 0,
    photo: "",
  });

  // State for managing edit mode and form data
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("personal"); // For tab navigation
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
      const profileData = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      // Combine user auth data with profile data
      const formattedProfile = {
        name: user?.name || "", // Name from auth
        gender: profileData?.gender || "",
        email: profileData?.email || user?.email || "",
        location: profileData?.location || "",
        address: profileData?.address || "",
        aadharcard: profileData?.aadharcard || "",
        phone: user?.phone || "", // Phone from auth
        skills: profileData?.skills || [],
        education: profileData?.education || "",
        experience: profileData?.experience || "",
        jobHistory: profileData?.jobHistory || [],
        rating: profileData?.rating || 0,
        photo: profileData?.photo || "",
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
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle skills input with comma separation
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value
      ? e.target.value.split(",").map((skill) => skill.trim())
      : [];
    setEditedProfile((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  // Handle job history adding

  // Save profile changes to the server
  const handleSave = async () => {
    try {
      setLoading(true);
      const userId = user._id || user.id;

      await axios.put(`/personalinfo?userId=${userId}`, editedProfile);
      setProfile(editedProfile);
      // console.log(editedProfile);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(
        "Failed to update profile: " +
          (err.response?.data?.message || err.message)
      );
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

  // Handle photo upload
  const [photoFile, setPhotoFile] = useState(null);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);

      // Preview the image
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedProfile((prev) => ({
          ...prev,
          photo: event.target.result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const uploadPhoto = async () => {
    if (!photoFile) return;

    try {
      const formData = new FormData();
      formData.append("photo", photoFile);
      formData.append("userId", user._id || user.id);

      const response = await axios.post("/upload-profile-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.photoUrl) {
        setEditedProfile((prev) => ({
          ...prev,
          photo: response.data.photoUrl,
        }));
        alert("Photo uploaded successfully!");
      }
    } catch (err) {
      alert("Failed to upload photo.");
    }
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative pt-20 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200">
          <div className="p-16 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex items-center justify-center flex-col">
                <div className="relative -mt-16 mb-4 sm:mb-0 mx-auto sm:mx-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                    <img
                      src={
                        displayProfile.photo ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    {editMode && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <label htmlFor="photoUpload" className="cursor-pointer">
                          <Camera size={24} className="text-white" />
                          <input
                            type="file"
                            id="photoUpload"
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  {editMode && photoFile && (
                    <button
                      className="mt-2 px-3 py-1 bg-blue-500 rounded-lg text-white text-xs hover:bg-blue-600 transition-colors w-full"
                      onClick={uploadPhoto}
                    >
                      Upload Photo
                    </button>
                  )}
                </div>
                {/* Rating Badge - Repositioned */}
                <div className=" bg-white py-1 px-3 rounded-full shadow-md flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="font-medium">
                    {displayProfile.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left sm:ml-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    {displayProfile.name || "Your Name"}
                  </h1>
                  {/* Edit Toggle Button - Repositioned */}
                  <button
                    onClick={toggleEditMode}
                    className={`p-2 rounded-full ${
                      editMode
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white transition-colors transform hover:scale-105 shadow-md`}
                  >
                    {editMode ? <X size={20} /> : <Edit2 size={20} />}
                  </button>
                </div>

                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span>
                      {displayProfile.location || "Add your location"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{displayProfile.email || "Add your email"}</span>
                  </div>
                  <div className="flex items-center text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{displayProfile.phone || "Add your phone"}</span>
                  </div>
                  <div className="flex items-center text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{displayProfile.gender || "Add your gender"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {displayProfile.skills?.length || 0}
              </div>
              <div className="mt-1 text-sm text-gray-600">Skills</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {displayProfile.jobHistory?.length || 0}
              </div>
              <div className="mt-1 text-sm text-gray-600">Completed Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {displayProfile.experience || "0"}
              </div>
              <div className="mt-1 text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {displayProfile.rating?.toFixed(1) || "0.0"}
              </div>
              <div className="mt-1 text-sm text-gray-600">Rating</div>
            </div>
          </div>
        </div> */}

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 sm:p-4 lg:p-6 mb-8 flex flex-col sm:flex-row overflow-x-auto border border-gray-100">
          <button
            className={`px-4 py-3 flex-1 transition-all rounded-lg font-medium overflow-x-hidden ${
              activeTab === "personal"
                ? "text-white bg-gray-900 rounded-xl hover:bg-gray-800 transform scale-105"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Details
          </button>
          {/* <button
            className={`px-4 py-3 flex-1 transition-all rounded-lg font-medium ${
              activeTab === "skills"
                ? "text-white bg-gray-900 rounded-xl hover:bg-gray-800 transform scale-105"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("skills")}
          >
            Skills & Experience
          </button>
          <button
            className={`px-4 py-3 flex-1 transition-all rounded-lg font-medium ${
              activeTab === "jobs"
                ? "text-white bg-gray-900 rounded-xl hover:bg-gray-800 transform scale-105"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            Job History
          </button> */}
          <button
            className={`px-4 py-3 flex-1 transition-all rounded-lg font-medium ${
              activeTab === "documents"
                ? "text-white bg-gray-900 rounded-xl hover:bg-gray-800 transform scale-105"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("documents")}
          >
            Documents
          </button>
        </div>

        {/* Personal Details Tab */}
        {activeTab === "personal" && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={displayProfile.name}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    editMode
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      : "border-transparent bg-gray-50"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={displayProfile.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    editMode
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      : "border-transparent bg-gray-50"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={displayProfile.email}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    editMode
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      : "border-transparent bg-gray-50"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={displayProfile.gender}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    editMode
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      : "border-transparent bg-gray-50"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City/Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={displayProfile.location}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    editMode
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      : "border-transparent bg-gray-50"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address
                </label>
                <textarea
                  name="address"
                  value={displayProfile.address}
                  onChange={handleChange}
                  disabled={!editMode}
                  rows="2"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    editMode
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      : "border-transparent bg-gray-50"
                  }`}
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Skills & Experience Tab */}
        {activeTab === "skills" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Education Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <BookOpen className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Education
                  </h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Educational Background
                  </label>
                  <textarea
                    name="education"
                    value={displayProfile.education}
                    onChange={handleChange}
                    disabled={!editMode}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      editMode
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        : "border-transparent bg-gray-50"
                    }`}
                    placeholder="e.g., Diploma in Electrical Engineering, ITI Certificate in Plumbing"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Skills Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <Award className="w-6 h-6 text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Skills
                  </h2>
                </div>
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
                    className={`w-full px-4 py-3 rounded-lg border ${
                      editMode
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        : "border-transparent bg-gray-50"
                    }`}
                    placeholder="e.g., Plumbing, Electrical, Carpentry"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {displayProfile.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-pink-100 rounded-lg mr-3">
                    <Briefcase className="w-6 h-6 text-pink-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Experience
                  </h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={displayProfile.experience}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      editMode
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        : "border-transparent bg-gray-50"
                    }`}
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Job History Tab */}
        {activeTab === "jobs" && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Job History
              </h2>
            </div>

            {/* Job history list */}
            <div className="space-y-6">
              {displayProfile.jobHistory &&
              displayProfile.jobHistory.length > 0 ? (
                displayProfile.jobHistory.map((job, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 border border-gray-100 relative hover:shadow-md transition-all transform hover:scale-101"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {job.projectName}
                      </h3>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm">
                        {job.duration || "Duration not specified"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-600">
                        <Award className="w-4 h-4 mr-2" />
                        <span>{job.role || "Role not specified"}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{job.location || "Location not specified"}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 text-lg">
                    No job history available
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-pink-100 rounded-lg mr-3">
                <CreditCard className="w-6 h-6 text-pink-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Identity Documents
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhar Card Number
                </label>
                <input
                  type="text"
                  name="aadharcard"
                  value={displayProfile.aadharcard}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    editMode
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      : "border-transparent bg-gray-50"
                  }`}
                  placeholder="e.g., XXXX-XXXX-XXXX"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Your Aadhar card helps verify your identity for jobs
                </p>
              </div>

              {/* Placeholder for future document uploads */}
              <div className="bg-gray-50 rounded-lg p-6 border border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors">
                <div className="text-gray-400 mb-2">
                  <CreditCard size={32} />
                </div>
                <p className="text-gray-500 text-center mb-1">
                  Upload additional documents
                </p>
                <p className="text-xs text-gray-400 text-center">Coming soon</p>
              </div>
            </div>
          </div>
        )}

        {/* Save Button - Only show when in edit mode */}
        {editMode && (
          <div className="m-5 bottom-8 right-8 z-10">
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-3  text-white bg-gray-900  hover:bg-gray-800 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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

export default ProvoiderProfile;
