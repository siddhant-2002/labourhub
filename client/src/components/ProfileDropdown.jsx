import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt, FaUser } from "react-icons/fa";

const ProfileDropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-black focus:outline-none"
      >
        <FaUserCircle className="text-2xl" />
        <span>{user.name}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform origin-top-right scale-95">
          <Link
            to={user.role === "worker" ? "/dashboard" : "/jobprovoider"}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            <FaTachometerAlt className="mr-2" />
            Dashboard
          </Link>
          <Link
            to={user.role === "worker" ? "/workerprofile" : "/provoiderprofile"}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            <FaUser className="mr-2" />
            Profile
          </Link>
          <button
            onClick={logout}
            className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black"
          >
            <FaSignOutAlt className="mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;