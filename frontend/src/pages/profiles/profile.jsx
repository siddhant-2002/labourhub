import React from 'react';

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    bio: "Experienced worker in construction and delivery services. Reliable and hardworking.",
    profilePicture: "https://via.placeholder.com/150"
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">{user.name}</h2>
        <p className="text-gray-600 text-center mb-4">{user.bio}</p>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-semibold w-24">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-24">Phone:</span>
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-24">Address:</span>
            <span>{user.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;