import React from "react";
// import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
          alt="Workers collaborating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-primary-700/85"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-10">
        <div className="text-center">
          <div className="inline-block animate-float">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white mb-8">
              🚀 Transforming the Future of Work
              {/* <ArrowRight className="ml-2 w-4 h-4" /> */}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Connecting Workers with
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-accent-300 to-accent-400 text-transparent bg-clip-text">
              Meaningful Opportunities
            </span>
          </h1>

          <p className="text-xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Find reliable workers or discover job opportunities in your area.
            LabourHub makes connections simple, secure, and efficient.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-primary">Find Workers</button>
            <button className="btn-secondary">Find Jobs</button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              ["10K+", "Active Workers"],
              ["5K+", "Businesses"],
              ["95%", "Success Rate"],
              ["24/7", "Support"],
            ].map(([stat, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat}</div>
                <div className="text-primary-200 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
