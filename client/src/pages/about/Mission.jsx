import React from "react";
import { Users, Target, Shield } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full lg:w-5/12"
          >
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-gray-900 text-white p-6 rounded-xl shadow-lg hidden lg:block hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">10K+</div>
              <div className="text-gray-200">Success Stories</div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-7/12"
          >
            <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-5xl font-pj mb-6">
              Our Mission & 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"> Inspiration</span>
            </h2>

            <p className="text-base leading-7 text-gray-600 font-inter mb-8">
              Born from the desire to bridge the gap between skilled workers and
              meaningful opportunities, LabourHub is revolutionizing the way labor
              connects with opportunity. We're building a future where every skilled
              worker has access to fair, reliable work.
            </p>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-4 p-4 rounded-xl bg-white/80 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100"
              >
                <div className="flex-shrink-0">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-pj">
                    Community-Driven Excellence
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600 font-inter">
                    Built on trust and transparency, our platform fosters a vibrant
                    community where skilled professionals connect and thrive together.
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-4 p-4 rounded-xl bg-white/80 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100"
              >
                <div className="flex-shrink-0">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-pj">
                    Focused on Real Impact
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600 font-inter">
                    Every connection made on LabourHub strengthens local economies,
                    empowers workers, and builds more resilient communities.
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-4 p-4 rounded-xl bg-white/80 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100"
              >
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-pj">
                    Trust & Security First
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600 font-inter">
                    We prioritize your safety with verified profiles, secure payments,
                    and a transparent review system that builds confidence.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
