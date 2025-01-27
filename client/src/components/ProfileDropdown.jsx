import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfileDropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear token and other user data
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };
  let user = props.user;
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        <img src="/profile.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
        <span className="text-gray-700">Profile</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <Link
            to={user.role === 'labour' ? '/dashboard' : '/jobprovoider'}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to={user.role === 'labour' ? '/userprofile' : '/provoiderprofile'}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;