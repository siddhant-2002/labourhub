import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">LabourHub</div>
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="text-white hover:text-gray-300">Home</a>
          <a href="#about" className="text-white hover:text-gray-300">About Us</a>
          {/* <a href="#why" className="text-white hover:text-gray-300">Why LabourHub?</a> */}
          {/* <a href="#motivation" className="text-white hover:text-gray-300">Motivation</a> */}
          {/* <a href="#how" className="text-white hover:text-gray-300">How It Works</a> */}
          {/* <a href="#features" className="text-white hover:text-gray-300">Key Features</a> */}
          {/* <a href="#community" className="text-white hover:text-gray-300">Community and Impact</a> */}
          {/* <a href="#testimonials" className="text-white hover:text-gray-300">Testimonials</a> */}
          <a href="#resources" className="text-white hover:text-gray-300">Resources</a>
          <a href="#faq" className="text-white hover:text-gray-300">FAQ</a>
          <a href="#contact" className="text-white hover:text-gray-300">Contact Us</a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <a href="#home" className="block text-white hover:text-gray-300 p-2">Home</a>
          <a href="#about" className="block text-white hover:text-gray-300 p-2">About Us</a>
          <a href="#why" className="block text-white hover:text-gray-300 p-2">Why LabourHub?</a>
          <a href="#motivation" className="block text-white hover:text-gray-300 p-2">Motivation</a>
          <a href="#how" className="block text-white hover:text-gray-300 p-2">How It Works</a>
          <a href="#features" className="block text-white hover:text-gray-300 p-2">Key Features</a>
          <a href="#community" className="block text-white hover:text-gray-300 p-2">Community and Impact</a>
          <a href="#testimonials" className="block text-white hover:text-gray-300 p-2">Testimonials</a>
          <a href="#resources" className="block text-white hover:text-gray-300 p-2">Resources</a>
          <a href="#faq" className="block text-white hover:text-gray-300 p-2">FAQ</a>
          <a href="#contact" className="block text-white hover:text-gray-300 p-2">Contact Us</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;