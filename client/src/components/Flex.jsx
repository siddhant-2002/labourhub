import React from "react";
import {
  FaLanguage,
  FaMapMarkerAlt,
  FaBell,
  FaUserShield,
  FaHandsHelping,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const Flex = () => {
  const features = [
    {
      icon: <FaLanguage className="w-12 h-12 text-white" />,
      title: "Multilingual Platform",
      description:
        "Break language barriers with support for multiple local languages.",
      gradient: "from-[#B3E5FC] to-[#E1F5FE]", // Light blue gradient
    },
    {
      icon: <FaMapMarkerAlt className="w-12 h-12 text-white" />,
      title: "Smart Matching",
      description:
        "Find opportunities or workers near you with precise geolocation.",
      gradient: "from-[#F1C4F4] to-[#F8B9F8]", // Light pink gradient
    },
    {
      icon: <FaBell className="w-12 h-12 text-white" />,
      title: "Real-Time Updates",
      description: "Get instant notifications for new jobs and applications.",
      gradient: "from-[#FFECB3] to-[#FFF9C4]", // Light yellow gradient
    },
    {
      icon: <FaUserShield className="w-12 h-12 text-white" />,
      title: "Verified Profiles",
      description: "Trust and safety with our verification system.",
      gradient: "from-[#C8E6C9] to-[#A5D6A7]", // Light green gradient
    },
    {
      icon: <FaHandsHelping className="w-12 h-12 text-white" />,
      title: "Community Driven",
      description: "Built by the community, for the community.",
      gradient: "from-[#FFEBEE] to-[#FFCDD2]", // Light coral gradient
    },
    {
      icon: <FaMoneyCheckAlt className="w-12 h-12 text-white" />,
      title: "Instant Payments",
      description: "Secure and fast payment processing system.",
      gradient: "from-[#D1C4E9] to-[#E8EAF6]", // Light lavender gradient
    },
  ];

  return (
    <div className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full "></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="relative inline-flex sm:inline">
            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
            <span className="relative mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
              Everything You Need to Succeed
            </span>
          </span>
          <p className="text-lg text-gray-600 p-8 max-w-2xl mx-auto">
            We're revolutionizing how workers and employers connect, making it
            easier than ever to find the right opportunity or talent.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Light gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient}  group-hover:opacity-60 transition-opacity duration-500 rounded-2xl`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center mb-6 space-x-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-black shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-black">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-black">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flex;
