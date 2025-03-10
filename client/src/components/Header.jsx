import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const isActive = (path) => location.pathname === path;

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
              <img
                className="w-auto h-8 group-hover:scale-105 transition-transform"
                src="logo.png"
                alt="LabourHub Logo"
              />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="relative w-10 h-10 text-gray-900 hover:text-gray-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`absolute block h-0.5 w-6 transform transition duration-300 ease-in-out ${
                    isOpen
                      ? "rotate-45 bg-gray-900"
                      : "-translate-y-2 bg-gray-600"
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-gray-600 transition duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 transform transition duration-300 ease-in-out ${
                    isOpen
                      ? "-rotate-45 bg-gray-900"
                      : "translate-y-2 bg-gray-600"
                  }`}
                ></span>
              </div>
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
                <span>{link.label}</span>

                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform origin-left transition-transform duration-200 ${
                    isActive(link.path)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {user ? (
              <ProfileDropdown user={user} />
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={login}
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

      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path) ? "text-gray-900" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <ProfileDropdown user={user} />
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={login}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Join community
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
