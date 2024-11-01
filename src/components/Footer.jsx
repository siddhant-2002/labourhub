import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">LabourHub</h2>
            <p className="text-gray-300">
              LabourHub is your go-to platform for connecting skilled workers with local job opportunities. Join our community today and experience the ease of connecting skills with opportunity.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li><a href="#home" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white">About Us</a></li>
              {/* <li><a href="#why" className="text-gray-300 hover:text-white">Why LabourHub?</a></li> */}
              {/* <li><a href="#motivation" className="text-gray-300 hover:text-white">Motivation</a></li> */}
              {/* <li><a href="#how" className="text-gray-300 hover:text-white">How It Works</a></li> */}
              {/* <li><a href="#features" className="text-gray-300 hover:text-white">Key Features</a></li> */}
              {/* <li><a href="#community" className="text-gray-300 hover:text-white">Community and Impact</a></li> */}
              {/* <li><a href="#testimonials" className="text-gray-300 hover:text-white">Testimonials</a></li> */}
              <li><a href="#resources" className="text-gray-300 hover:text-white">Resources</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white">FAQ</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300">Email: support@labourhub.com</p>
            <p className="text-gray-300">Phone: +1 234 567 890</p>
            <p className="text-gray-300">Address: 123 LabourHub St, City, Country</p>
          </div>
          <div className="w-full md:w-1/4 ">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4 items-center justify-center">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.591 1.325-1.324v-21.351c0-.733-.592-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.924 2.205-4.924 4.924 0 .386.044.762.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.729-.666 1.574-.666 2.476 0 1.709.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.228-.616v.062c0 2.386 1.697 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.317 0-.626-.031-.927-.088.627 1.956 2.445 3.379 4.6 3.419-1.685 1.32-3.809 2.107-6.115 2.107-.398 0-.79-.023-1.175-.069 2.179 1.397 4.768 2.212 7.548 2.212 9.057 0 14.01-7.506 14.01-14.01 0-.213-.005-.426-.014-.637.961-.694 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.23 0h-20.46c-.974 0-1.77.796-1.77 1.77v20.459c0 .974.796 1.771 1.77 1.771h20.459c.974 0 1.771-.797 1.771-1.771v-20.459c0-.974-.797-1.77-1.771-1.77zm-13.539 20.452h-3.077v-10.452h3.077v10.452zm-1.538-11.938c-.987 0-1.787-.8-1.787-1.787s.8-1.787 1.787-1.787 1.787.8 1.787 1.787-.8 1.787-1.787 1.787zm13.539 11.938h-3.077v-5.604c0-1.337-.027-3.061-1.865-3.061-1.865 0-2.151 1.454-2.151 2.957v5.708h-3.077v-10.452h2.951v1.428h.042c.411-.776 1.414-1.593 2.912-1.593 3.113 0 3.688 2.048 3.688 4.711v5.906z"/>
                </svg>
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.071-1.281.059-2.563.334-3.535 1.306-.972.972-1.247 2.254-1.306 3.535-.059 1.28-.071 1.688-.071 4.947s.012 3.667.071 4.947c.059 1.281.334 2.563 1.306 3.535.972.972 2.254 1.247 3.535 1.306 1.28.059 1.688.071 4.947.071s3.667-.012 4.947-.071c1.281-.059 2.563-.334 3.535-1.306.972-.972 1.247-2.254 1.306-3.535.059-1.28.071-1.688.071-4.947s-.012-3.667-.071-4.947c-.059-1.281-.334-2.563-1.306-3.535-.972-.972-2.254-1.247-3.535-1.306-1.28-.059-1.688-.071-4.947-.071zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.207 0-4-1.793-4-4s1.793-4 4-4 4 1.793 4 4-1.793 4-4 4zm6.406-11.845c-.796 0-1.441-.645-1.441-1.441s.645-1.441 1.441-1.441 1.441.645 1.441 1.441-.645 1.441-1.441 1.441z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} LabourHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;