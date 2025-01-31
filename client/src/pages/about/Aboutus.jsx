import React from "react";
import MissionSection from "./MissionSection";
import Timeline from "./Timeline";
import Mission from "./Mission";

const Aboutus = () => {
  return (
    <div className="min-h-screen pt-24">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center p-10">
        <div className="inline-block animate-float">
          <p className="inline-flex px-4 py-2 text-base text-white border border-gray-200 rounded-full backdrop-blur-sm font-pj bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            🌟 Transforming Work Culture
          </p>
        </div>

        <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj flex flex-col items-center gap-4 sm:flex-row sm:gap-3 justify-center">
          <span>About</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            LabourHub
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">
          Empowering skilled professionals to discover meaningful opportunities and build successful careers through our innovative platform.
        </p>
      </div>

      {/* Sections */}
      
          <MissionSection />
        

          <Timeline />

          <Mission />
      
    </div>
  );
};

export default Aboutus;
