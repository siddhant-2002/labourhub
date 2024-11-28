import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">LabourHub</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <span to="/" className="text-gray-700 hover:text-blue-600">Home</span>
              <span to="/about" className="text-gray-700 hover:text-blue-600">About</span>
              <span to="/features" className="text-gray-700 hover:text-blue-600">Features</span>
              <div className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                <span>🌐</span>
                <span>Language</span>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                Login
              </button>
            </div>
  
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                {isOpen ? '✖' : '☰'}
              </button>
            </div>
          </div>
        </div>
  
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <span to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</span>
              <span to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">About</span>
              <span to="/features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Features</span>
              <div className="flex items-center space-x-2 px-3 py-2 text-gray-700">
                <span>🌐</span>
                <span>Language</span>
              </div>
              <button className="w-full text-center bg-primary-700 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                Login
              </button>
            </div>
          </div>
        )}
      </nav>
    );
}

export default Header;