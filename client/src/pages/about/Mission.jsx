import React from "react";
import { Users, Target, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-w-3 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover transition-transform transform hover:scale-105 hover:opacity-90"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-black text-white p-8 rounded-xl shadow-lg hidden lg:block">
              <div className="text-4xl font-bold">10K+</div>
              <div className="text-blue-100">Success Stories</div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 text-center lg:text-left">
            <span className="items-center text-center mb-7">
              <span className="relative inline-flex sm:inline">
                <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                <span className="relative mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-4xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj text-center">
                  Our Mission & Inspiration
                </span>
              </span>
            </span>

            <p className="text-lg text-gray-700 mb-8">
              Born from the desire to bridge the gap between skilled workers and
              meaningful opportunities, LabourHub is more than just a platform—
              it's a community dedicated to empowering workers and facilitating
              growth in local economies.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <Users className="w-8 h-8 text-black transform hover:scale-125 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Community-Driven
                  </h3>
                  <p className="text-gray-600">
                    Built on trust and transparency, our platform ensures fair
                    opportunities for all members.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <Target className="w-8 h-8 text-black transform hover:scale-125 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Focused on Impact
                  </h3>
                  <p className="text-gray-600">
                    Every connection made on LabourHub contributes to stronger,
                    more resilient communities.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-black transform hover:scale-125 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Safety First
                  </h3>
                  <p className="text-gray-600">
                    We prioritize the security and well-being of our users
                    through verified profiles and secure payments.
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
