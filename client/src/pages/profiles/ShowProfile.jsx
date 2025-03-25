import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "../../utils/axios";
// import { AuthContext } from "../../context/AuthContext";
import {
  MapPin,
  Mail,
  Phone,
  Award,
  Clock,
  Briefcase,
  BookOpen,
  User,
  Calendar,
  Star,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const ShowProfile = () => {
  // Initial state with default values
  const initialProfile = useMemo(
    () => ({
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
    }),
    []
  );

  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");

  // const { user } = useContext(AuthContext);
  // const [newuser, setnewuser] = useState({});
  // const user = newuser;
  // console.log(user);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");

  // Fetch profile data from the server
  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true); // Ensure loading state resets

      const response = await axios.get(`/personalinfo?userId=${userId}`);
      const userResponse = await axios.get(`/user?userId=${userId}`);

      const userData = userResponse.data;
      // setnewuser(userData); // Save user data

      const profileData = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      const formattedProfile = {
        ...initialProfile,
        name: userData?.name || "",
        gender: profileData?.gender || "",
        email: profileData?.email || userData?.email || "",
        location: profileData?.location || "",
        address: profileData?.address || "",
        aadharcard: profileData?.aadharcard || null,
        phone: userData?.phone || "",
        skills: profileData?.skills || [],
        education: profileData?.education || "",
        experience: profileData?.experience || "",
        jobHistory: profileData?.jobHistory || [],
        rating: profileData?.rating || 0,
        photo: profileData?.photo || "",
      };

      setProfile(formattedProfile);
      console.log(formattedProfile);
    } catch (err) {
      setError("Failed to load profile information.");
    } finally {
      setLoading(false);
    }
  }, [initialProfile, userId]);

  // Load profile data when userId changes
  useEffect(() => {
    if (userId) {
      fetchProfileData();
    }
  }, [fetchProfileData, userId]);

  // // Loading state
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
  const displayProfile = profile;
  console.log(displayProfile.jobHistory);

  // displayProfile.jobHistory = jobhistory; // Use job history from custom hook

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
                  </div>
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
                  <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors transform hover:scale-105 shadow-md"></button>
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
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
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
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 sm:p-4 lg:p-6 mb-8 flex flex-col sm:flex-row overflow-x-auto border border-gray-100">
          <button
            className={`px-4 py-3 flex-1 transition-all rounded-lg font-medium ${
              activeTab === "personal"
                ? "text-white bg-gray-900 rounded-xl hover:bg-gray-800 transform scale-105"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Details
          </button>
          <button
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

                <span className="border-transparent bg-gray-50 w-full px-4 py-3 rounded-lg border">
                  {displayProfile.name}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>

                <span className="border-transparent bg-gray-50 w-full px-4 py-3 rounded-lg border">
                  {displayProfile.phone}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <span className="border-transparent bg-gray-50 w-full px-4 py-3 rounded-lg border">
                  {displayProfile.email}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                
                <span className="border-transparent bg-gray-50 w-full px-4 py-3 rounded-lg border">
                {displayProfile.gender}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City/Location
                </label>

                <span className="border-transparent bg-gray-50 w-full px-4 py-3 rounded-lg border">
                  {displayProfile.location}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address
                </label>

                <span className="border-transparent bg-gray-50 w-full px-4 py-3 rounded-lg border">
                  {displayProfile.address}
                </span>
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
          

                  <span className="border-transparent bg-gray-50 w-full px-4 py-3 rounded-lg border">
                  {displayProfile.education}
                  </span>
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
                  
                  <span className="w-full px-4 py-3 rounded-lg border">
                  {displayProfile.experience}
                  </span>
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
                        {job.jobTitle}
                      </h3>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm">
                        {job.jobType || "Duration not specified"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-600">
                        <Award className="w-4 h-4 mr-2" />
                        <span>
                          {job.jobdescription || "Role not specified"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>
                          {job.jobLocation || "Location not specified"}
                        </span>
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
      </div>
    </div>
  );
};

export default ShowProfile;
