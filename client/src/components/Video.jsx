import React from "react";

const Video = () => {
  return (
    <div className="video-container text-center mx-auto my-8 p-8 max-w-4xl  ">
      {/* <h2 className="p-2 text-xl font-bold leading-tight text-gray-900 sm:text-xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
        How Our Platform Works
      </h2> */}
      <div className="items-center text-center mb-7">
        <span className="relative inline-flex sm:inline">
          <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
          <span className="relative mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj text-center">
            How Our Platform Works
          </span>
        </span>
      </div>
      <video className="w-full h-auto rounded-lg mb-6" controls>
        <source src="path_to_your_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="testimonials mt-6">
        <h3 className="text-xl mb-4">Testimonials</h3>
        <p className="text-lg mb-2">
          "This platform has changed the way I find work!" - Smartphone User
        </p>
        <p className="text-lg mb-2">
          "Even without a smartphone, I can easily access job opportunities." -
          Non-Smartphone User
        </p>
      </div>
      <div className="relative inline-flex mt-5 group">
        <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

        <button className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
          watch our story
        </button>
      </div>
    </div>
  );
};

export default Video;
