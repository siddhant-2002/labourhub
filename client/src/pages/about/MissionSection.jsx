import React from 'react';
import { Target, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const MissionSection = () => {
  return (
    <section className="relative py-16 overflow-hidden">
    

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Target,
              title: 'Our Mission',
              description: 'To create a seamless connection between skilled professionals and meaningful work opportunities.',
              color: 'text-blue-600'
            },
            {
              icon: Users,
              title: 'Our Vision',
              description: 'Building a world where everyone has access to fair work opportunities and sustainable livelihoods.',
              color: 'text-purple-600'
            },
            {
              icon: Shield,
              title: 'Our Values',
              description: 'Trust, transparency, and community empowerment are at the heart of everything we do.',
              color: 'text-green-600'
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white/80 hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-pj">
                  {item.title}
                </h3>
              </div>
              <p className="text-base leading-7 text-gray-600 font-inter">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MissionSection;
