import React from "react";

const Timeline = () => {
  const milestones = [
    {
      year: "2023",
      title: "LabourHub Launch",
      description: "Started with a vision to transform the labour market.",
    },
    {
      year: "2023",
      title: "10,000 Users",
      description: "Reached our first major milestone in user adoption.",
    },
    {
      year: "2024",
      title: "Mobile App Launch",
      description: "Expanded our platform to mobile devices.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Started operations in multiple countries.",
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="items-center text-center mb-7">
          <span className="relative inline-flex sm:inline">
            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
            <span className="relative mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj text-center">
              Our Journey
            </span>
          </span>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-black" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                  }`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg transition-transform duration-500 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-black font-semibold mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#44BCFF] rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
