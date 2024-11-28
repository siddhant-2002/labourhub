import React from 'react';
import { Users, Target, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-w-3 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl hidden lg:block">
              <div className="text-4xl font-bold">10K+</div>
              <div className="text-blue-100">Success Stories</div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission & Inspiration
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Born from the desire to bridge the gap between skilled workers and meaningful opportunities, 
              LabourHub is more than just a platform—it's a community dedicated to empowering workers 
              and facilitating growth in local economies.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Community-Driven</h3>
                  <p className="text-gray-600">
                    Built on trust and transparency, our platform ensures fair opportunities for all members.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Focused on Impact</h3>
                  <p className="text-gray-600">
                    Every connection made on LabourHub contributes to stronger, more resilient communities.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety First</h3>
                  <p className="text-gray-600">
                    We prioritize the security and well-being of our users through verified profiles and secure payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;