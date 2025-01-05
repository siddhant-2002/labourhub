import React, { useState, useEffect } from "react";
// import axios from "axios";

const WorkerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchProfile = async () => {
      try {
        // const response = await axios.get("https://api.example.com/worker-profile");
        // setProfile(response.data);
        setProfile({
            photo: "https://via.placeholder.com/150",
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+91 9876543210",
            location: "Mumbai, Maharashtra, India",
            skills: ["Plumbing", "Electrical Work", "Carpentry"],
            experience: 5,
            jobHistory: [
              {
                projectName: "Project A",
                role: "Plumber",
                duration: "Jan 2020 - Dec 2020",
                location: "Mumbai, Maharashtra",
              },
              {
                projectName: "Project B",
                role: "Electrician",
                duration: "Jan 2021 - Dec 2021",
                location: "Pune, Maharashtra",
              },
            ],
          })
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile information.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-blue-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Worker Profile</h2>
        
        <div className="flex flex-col items-center space-y-6">
          {/* Profile Photo */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={profile.photo || "https://via.placeholder.com/150"} // Fallback to placeholder if no photo is provided
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Profile Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-lg text-gray-900">{profile.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-lg text-gray-900">{profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-lg text-gray-900">{profile.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <p className="mt-1 text-lg text-gray-900">{profile.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Skills</label>
                <p className="mt-1 text-lg text-gray-900">{profile.skills.join(", ")}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <p className="mt-1 text-lg text-gray-900">{profile.experience} years</p>
              </div>
            </div>
          </div>

          {/* Job History */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">Job History</h3>
            <div className="space-y-4">
              {profile.jobHistory.map((job, index) => (
                <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-900">{job.projectName}</h4>
                  <p className="text-gray-700">Role: {job.role}</p>
                  <p className="text-gray-700">Duration: {job.duration}</p>
                  <p className="text-gray-700">Location: {job.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
