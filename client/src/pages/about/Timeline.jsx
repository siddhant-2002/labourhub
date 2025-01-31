import React from "react";

const milestones = [
  {
    year: "2023",
    title: "LabourHub Launch",
    description: "Started with a vision to transform the labour market and connect skilled professionals.",
  },
  {
    year: "2023",
    title: "1000+ Users",
    description: "Reached our first major milestone in user adoption and community building.",
  },
  {
    year: "2024",
    title: "Mobile Platform",
    description: "Expanded our platform to mobile devices for anywhere, anytime access.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Started operations in multiple countries, connecting workers across borders.",
  },
];

const Timeline = () => {
  return (
    <section className="relative py-8">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl font-pj">
            Our Journey of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Innovation
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                {/* Content */}
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "pr-4 text-right" : "pl-4 ml-auto"
                  }`}
                >
                  <div className="bg-white/80 p-3 rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 hover:bg-gray-50">
                    <div className="inline-flex px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-1">
                      {milestone.year}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1 font-pj">
                      {milestone.title}
                    </h3>
                    <p className="text-xs leading-5 text-gray-600 font-inter">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-3 w-2.5 h-2.5 rounded-full border border-white shadow-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
