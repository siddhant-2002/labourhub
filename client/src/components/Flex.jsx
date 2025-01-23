import React from "react";
import { MapPin, Globe, Clock, Shield, Users, Zap } from "lucide-react";
const Flex = () => {
  const features = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Multilingual Platform",
      description:
        "Break language barriers with support for multiple local languages.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: "Smart Matching",
      description:
        "Find opportunities or workers near you with precise geolocation.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Real-Time Updates",
      description: "Get instant notifications for new jobs and applications.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Verified Profiles",
      description: "Trust and safety with our verification system.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Community Driven",
      description: "Built by the community, for the community.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Instant Payments",
      description: "Secure and fast payment processing system.",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  
  return (
    <div className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            Why Choose LabourHub?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing how workers and employers connect, making it
            easier than ever to find the right opportunity or talent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card group">
              <div className="mb-6 inline-block p-3 rounded-2xl bg-gradient-to-br group-hover:scale-110 transition-transform duration-200">
                <div
                  className={`bg-gradient-to-br ${feature.gradient} p-4 rounded-xl text-white`}
                >
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>



    </div>
  );
};

export default Flex;
