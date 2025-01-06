import React from 'react';
import { Target, Users, Shield } from 'lucide-react';

const MissionSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              description: 'To create a seamless connection between skilled professionals and meaningful work opportunities.'
            },
            {
              icon: Users,
              title: 'Our Vision',
              description: 'Building a world where everyone has access to fair work opportunities and sustainable livelihoods.'
            },
            {
              icon: Shield,
              title: 'Our Values',
              description: 'Trust, transparency, and community empowerment are at the heart of everything we do.'
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-3 rounded-2xl bg-blue-50 mb-6">
                <item.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MissionSection;