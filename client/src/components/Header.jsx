import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const Header = ({ isLoggedIn, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full py-4 md:py-4 bg-white bg-opacity-70 backdrop-blur-md shadow-md z-50">      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="flex ">
              <img className="w-auto h-8" src="logo.png" alt="LabourHub Logo" />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button type="button" className="text-gray-900" onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          <div className="hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-12 lg:-translate-x-1/2 lg:left-1/2">
            <Link to="/" className="text-base font-medium text-gray-900 transition-all duration-200 font-pj hover:text-opacity-50">
              Home
            </Link>
            <Link to="/about" className="text-base font-medium text-gray-900 transition-all duration-200 font-pj hover:text-opacity-50">
              About
            </Link>
            <Link to="/features" className="text-base font-medium text-gray-900 transition-all duration-200 font-pj hover:text-opacity-50">
              Features
            </Link>
            <Link to="/language" className="text-base font-medium text-gray-900 transition-all duration-200 font-pj hover:text-opacity-50">
              Language
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            {isLoggedIn ? (
              <ProfileDropdown user={user} />
            ) : (
              <>
                <Link to="/login" className="text-base font-medium text-gray-900 transition-all duration-200 font-pj hover:text-opacity-50">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="relative px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white"
                  role="button"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#A3DFFF] via-[#FFB3F0] to-[#FFB3B3] blur-lg filter opacity-30 rounded-2xl"></div>
                  <span className="relative">Join community</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Features
            </Link>
            <Link to="/language" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Language
            </Link>
            {isLoggedIn ? (
              <ProfileDropdown user={user} />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full text-center bg-primary-700 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;