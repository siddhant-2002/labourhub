import React from 'react';

const Timeline = () => {
  const milestones = [
    {
      year: '2023',
      title: 'LabourHub Launch',
      description: 'Started with a vision to transform the labour market.'
    },
    {
      year: '2023',
      title: '10,000 Users',
      description: 'Reached our first major milestone in user adoption.'
    },
    {
      year: '2024',
      title: 'Mobile App Launch',
      description: 'Expanded our platform to mobile devices.'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Started operations in multiple countries.'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200" />
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="text-blue-600 font-semibold mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;