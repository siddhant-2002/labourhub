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
      description: "vadgaon, Pune, Maharashtra, India",
    },
    {
      index: 3,
      icon: faPhoneAlt,
      title: "Phone Number",
      description: "+91 1234567890",
    },
    {
      index: 2,
      icon: faEnvelope,
      title: "Email Address",
      description: "labor@gmail.com",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Thank you! Your message has been sent.");
    setTimeout(() => setFormStatus(""), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">
              Contact Details
            </h3>
            <div className="flex gap-4 flex-col">
              {contactInfo.map((info) => (
                <div key={info.index} className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="mb-2 flex items-start gap-4">
                    <FontAwesomeIcon
                      icon={info.icon}
                      className="text-blue-500"
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
            <h3 className="text-2xl font-semibold mb-2 text-blue-500">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  aria-required="true"
                  className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-required="true"
                  className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="phone"
                  className="block text-lg font-medium mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  aria-required="true"
                  className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="message"
                  className="block text-lg font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  aria-required="true"
                  className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
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