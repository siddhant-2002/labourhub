import React, { useState, useEffect } from "react";

const ProviderProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(false);
        setProfile({
          companyName: "ABC Corp",
          email: "contact@abccorp.com",
          phone: "+91 1234567890",
          location: "Pune, Maharashtra, India",
          logo: "https://example.com/logo.jpg",
          jobListings: [
            {
              title: "Software Engineer",
              location: "Pune, Maharashtra",
              experience: "2-5 years",
              salary: "₹6,00,000 - ₹10,00,000",
            },
            {
              title: "Project Manager",
              location: "Pune, Maharashtra",
              experience: "5-10 years",
              salary: "₹12,00,000 - ₹18,00,000",
            },
          ],
        });
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
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 overflow-hidden bg-gray-50">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start rounded-2xl p-8 bg-white shadow-lg space-y-6 md:space-y-0 md:space-x-8">
          {/* Company Logo */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={profile.logo || "https://via.placeholder.com/150"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">{profile.companyName}</h2>
            <p className="text-gray-600 mt-2">{profile.location}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700 font-semibold">Email</p>
                <p className="text-gray-900">{profile.email}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700 font-semibold">Phone</p>
                <p className="text-gray-900">{profile.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center">Job Listings</h3>
          <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {profile.jobListings.map((job, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800">{job.title}</h4>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-gray-600">{job.experience}</p>
                <p className="text-gray-600">{job.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderProfile;