import React from 'react';
import { Users, Award, Globe, Heart } from 'lucide-react';
import MissionSection from './MissionSection';
import Timeline from './Timeline';


const Aboutus = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">LabourHub</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connecting skilled professionals with meaningful opportunities since 2023
            </p>
          </div>
        </div>
      </div>

      <MissionSection />
      <Timeline />

      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: '50K+', label: 'Active Users' },
              { icon: Award, number: '10K+', label: 'Jobs Completed' },
              { icon: Globe, number: '100+', label: 'Cities' },
              { icon: Heart, number: '95%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <stat.icon className="w-8 h-8 mx-auto mb-4 opacity-75" />
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;