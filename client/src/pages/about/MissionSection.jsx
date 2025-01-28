import React from 'react';
import { Target, Users, Shield } from 'lucide-react';

const MissionSection = () => {
  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              description: 'To create a seamless connection between skilled professionals and meaningful work opportunities.',
            },
            {
              icon: Users,
              title: 'Our Vision',
              description: 'Building a world where everyone has access to fair work opportunities and sustainable livelihoods.',
            },
            {
              icon: Shield,
              title: 'Our Values',
              description: 'Trust, transparency, and community empowerment are at the heart of everything we do.',
            },
          ].map((item, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="inline-block p-4 rounded-full mb-6 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]">
                <item.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-lg text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MissionSection;
