import React from "react";
import MissionSection from "./MissionSection";
import Timeline from "./Timeline";
import Mission from "./Mission";

const Aboutus = () => {
  return (
    <div className="min-h-screen ">
      <div className="pt-10 pb-12 md:pt-20 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About{" "}
              <span className="items-center text-center mb-7">
                <span className="relative inline-flex sm:inline">
                  <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                  <span className="relative mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj text-center">
                    LabourHub
                  </span>
                </span>
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connecting skilled professionals with meaningful opportunities
              since 2023
            </p>
          </div>
        </div>
      </div>

      <MissionSection />
      <Timeline />
      <Mission />

      
    </div>
  );
};

export default Aboutus;
