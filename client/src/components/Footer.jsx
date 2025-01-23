import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">LabourHub</h3>
            <p className="text-gray-400">
              Connecting workers with opportunities, building stronger
              communities.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  How It Works
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Success Stories
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Blog
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Help Center
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Safety Tips
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>support@labourhub.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Mon - Fri, 9:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} LabourHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
