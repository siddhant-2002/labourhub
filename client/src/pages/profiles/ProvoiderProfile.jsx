import React, { useState, useEffect } from "react";
// import axios from "axios";

const ProviderProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchProfile = async () => {
      try {
        // const response = await axios.get("https://api.example.com/provider-profile");
        // setProfile(response.data);
        setLoading(false);
        setProfile({
            "companyName": "ABC Corp",
            "email": "contact@abccorp.com",
            "phone": "+91 1234567890",
            "location": "Pune, Maharashtra, India",
            "logo": "https://example.com/logo.jpg",
            "jobListings": [
              {
                "title": "Software Engineer",
                "location": "Pune, Maharashtra",
                "experience": "2-5 years",
                "salary": "₹6,00,000 - ₹10,00,000"
              },
              {
                "title": "Project Manager",
                "location": "Pune, Maharashtra",
                "experience": "5-10 years",
                "salary": "₹12,00,000 - ₹18,00,000"
              }
            ]
          }
          )
      } catch (err) {
        setError("Failed to load provider profile information.");
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
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Job Provider Profile</h2>
        
        <div className="flex flex-col items-center space-y-6">
          {/* Company Logo */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={profile.logo || "https://via.placeholder.com/150"} // Fallback to placeholder image
              alt="Company Logo"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Profile Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <p className="mt-1 text-lg text-gray-900">{profile.companyName}</p>
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
            </div>
          </div>

      
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
