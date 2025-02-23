import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const WorkerProfile = () => {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    if (user && user.id) {
      axios.get(`http://localhost:3000/personalinfo?userId=${user.id}`)
        .then(response => {
          console.log("Profile data:", response.data);
          setProfile(response.data);
        })
        .catch(err => {
          console.error("Error fetching profile:", err);
          setError("Failed to load profile information.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("User not logged in.");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/personalinfo/${user.id}`, profile);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

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
          {/* Profile Photo */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={profile.photo || "https://via.placeholder.com/150"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Edit Profile</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <label className="text-gray-700 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <label className="text-gray-700 font-semibold">Location</label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <label className="text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <label className="text-gray-700 font-semibold">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <label className="text-gray-700 font-semibold">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={profile.skills.join(", ")}
                  onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(", ") })}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <label className="text-gray-700 font-semibold">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Job History */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center">Job History</h3>
          <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {profile.jobHistory.map((job, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800">{job.projectName}</h4>
                <p className="text-gray-600">Role: {job.role}</p>
                <p className="text-gray-600">Duration: {job.duration}</p>
                <p className="text-gray-600">Location: {job.location}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkerProfile;