import React from "react";
import { Link } from "react-router-dom";

const Hero = (props) => {
  const isLoggedIn = props;

  return (
    <section className="relative py-6 sm:py-16 lg:pt-15 xl:pb-0">
      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block animate-float">
          <p className="inline-flex px-4 py-2 text-base text-white border border-gray-200 rounded-full backdrop-blur-sm font-pj bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            🚀 Transforming the Future of Work
          </p>
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
            Connecting Workers with Meaningful Opportunities
          </h1>
          <p className="max-w-md mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">
            Find reliable workers or discover job opportunities in your area.
            LabourHub makes connections simple, secure, and efficient.
          </p>

          <div className="relative inline-flex mt-10 group">
            <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

            {isLoggedIn ? (
              <Link to="/dashboard">
                <button className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                  Find Jobs
                </button>
              </Link>
            ) : (
              <Link to="/signup">
                <button className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                  Find Jobs
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
        {[
          ["10K+", "Active Workers"],
          ["5K+", "Businesses"],
          ["95%", "Success Rate"],
          ["24/7", "Support"],
        ].map(([stat, label]) => (
          <div key={label} className="text-center">
            <div className="text-3xl font-bold text-black mb-1">{stat}</div>
            <div className="text-black text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* <div className="mt-16 md:mt-20">
        <img
          className="object-cover object-top w-full h-auto mx-auto scale-150 2xl:max-w-screen-2xl xl:scale-100"
          src="https://d33wubrfki0l68.cloudfront.net/54780decfb9574945bc873b582cdc6156144a2ba/d9fa1/images/hero/4/illustration.png"
          alt="Hero Illustration"
        />
      </div> */}
    </section>
  );
};

export default Hero;
