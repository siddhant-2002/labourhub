import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const Header = ({ isLoggedIn, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/features", label: "Features" },
    { path: "/language", label: "Language" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full py-4 md:py-4 bg-white z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg bg-opacity-80 backdrop-blur-lg" : "bg-opacity-90"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <img className="w-auto h-8 group-hover:scale-105 transition-transform" src="logo.png" alt="LabourHub Logo" />

            </Link>
          </div>

          <div className="flex lg:hidden">
            <button 
              type="button" 
              className="text-gray-900 hover:text-gray-600 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-base font-medium transition-all duration-200 hover:text-gray-900 group ${
                  isActive(link.path) ? "text-gray-900" : "text-gray-600"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform origin-left transition-transform duration-200 ${
                  isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}></span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {isLoggedIn ? (
              <ProfileDropdown user={user} />
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#A3DFFF] via-[#FFB3F0] to-[#FFB3B3] rounded-full blur opacity-20"></span>
                  <span className="relative">Join community</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-2 pb-3 space-y-2 bg-white border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                  isActive(link.path)
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="pt-2 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-base font-medium text-center text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-2 text-base font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                >
                  Join community
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;