import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Thank you! Your message has been sent.");
    setTimeout(() => setFormStatus(""), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="p-8 max-w-6xl w-full">
        <div className="items-center text-center mb-16">
          <span className="relative inline-flex sm:inline">
            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
            <span className="relative mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj text-center">
              Contact Us
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="p-6  rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-black">
              Contact Details
            </h3>
            <div className="flex gap-4 flex-col">
              {contactInfo.map((info) => (
                <div
                  key={info.index}
                  className={`p-4 border border-gray-200 rounded-lg ${info.color}`}
                >
                  <div className="mb-2 flex items-start gap-4">
                    <FontAwesomeIcon
                      icon={info.icon}
                      className="text-black"
                    />
                    <div>
                      <p className="text-lg font-medium">
                        {info.title}:{" "}
                        <span className="font-normal flex flex-wrap">
                          {info.description}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-black">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="name" className="block text-lg font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  aria-required="true"
                  className="w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="email" className="block text-lg font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-required="true"
                  className="w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="phone" className="block text-lg font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  aria-required="true"
                  className="w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="message" className="block text-lg font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  aria-required="true"
                  className="w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="relative inline-flex mt-5 group">
                <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

                <button className="w-full relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                  Submit
                </button>
              </div>
            </form>
            {formStatus && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
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
