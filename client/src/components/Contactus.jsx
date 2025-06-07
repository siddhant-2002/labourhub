import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import translatePage from "../utils/translate";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Contactus = () => {
  const [formStatus, setFormStatus] = useState("");
  const contactInfo = [
    {
      index: 1,
      icon: faMapMarkerAlt,
      title: "Location",
      description: "Vadgaon, Pune, Maharashtra, India",
      color: "bg-blue-50", // Light blue background for this info
    },
    {
      index: 2,
      icon: faPhoneAlt,
      title: "Phone Number",
      description: "+91 1234567890",
      color: "bg-green-50", // Light green background for this info
    },
    {
      index: 3,
      icon: faEnvelope,
      title: "Email Address",
      description: "labor@gmail.com",
      color: "bg-yellow-50", // Light yellow background for this info
    },
  ];

  useEffect(() => {
    translatePage();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Thank you! Your message has been sent.");
    setTimeout(() => setFormStatus(""), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8">
      <div className="w-full max-w-6xl px-4">
        <div className="text-center mb-8">
          <span className="relative inline-flex sm:inline">
            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
            <span className="relative text-4xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-4xl font-pj">
              Contact Us
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Details */}
          <div className="p-6 rounded-3xl shadow-lg bg-white/95 backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Contact Details
            </h3>
            <div className="flex gap-4 flex-col">
              {contactInfo.map((info) => (
                <div
                  key={info.index}
                  className={`p-4 border border-gray-100 rounded-2xl ${info.color} transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center bg-white rounded-xl shadow-sm">
                      <FontAwesomeIcon
                        icon={info.icon}
                        className="text-gray-800 text-lg"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-0.5">
                        {info.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 rounded-3xl shadow-lg bg-white/95 backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  aria-required="true"
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-required="true"
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  aria-required="true"
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  required
                  aria-required="true"
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full relative inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-300 bg-gray-900 rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </div>
            </form>
            {formStatus && (
              <div className="mt-3 p-3 bg-green-50 text-green-800 rounded-xl border border-green-100 text-sm">
                {formStatus}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
