import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ isLoggedIn }) => {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 xl:pb-0 overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

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

          <div className="mt-10 flex justify-center">
            <Link
              to={isLoggedIn ? "/dashboard" : "/login"}
              className="inline-block px-8 py-4 text-lg font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Find Jobs
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
        {[
          ["10K+", "Active Workers"],
          ["5K+", "Businesses"],
          ["95%", "Success Rate"],
          ["24/7", "Support"],
        ].map(([number, label], index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-gray-900">{number}</div>
            <div className="mt-1 text-sm text-gray-600">{label}</div>
          </div>
        ))}
      </div>

      {/* Hero illustration - positioned below stats */}
      <div className="mt-16 md:mt-20 relative pointer-events-none">
        <img
          className="object-cover object-center w-full h-auto mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl"
          src="https://d33wubrfki0l68.cloudfront.net/54780decfb9574945bc873b582cdc6156144a2ba/d9fa1/images/hero/4/illustration.png"
          alt="Hero Illustration"
        />
      </div>

      
    </section>
  );
};

export default Hero;
