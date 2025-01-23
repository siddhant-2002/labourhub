import React from 'react';

const Video = () => {
  return (
    <div className="video-container text-center mx-auto my-8 p-8 max-w-4xl bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-6">How Our Platform Works</h2>
      <video className="w-full h-auto rounded-lg mb-6" controls>
        <source src="path_to_your_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="testimonials mt-6">
        <h3 className="text-xl mb-4">Testimonials</h3>
        <p className="text-lg mb-2">"This platform has changed the way I find work!" - Smartphone User</p>
        <p className="text-lg mb-2">"Even without a smartphone, I can easily access job opportunities." - Non-Smartphone User</p>
      </div>
      <button className="watch-story-button mt-6 px-6 py-2 text-lg text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300">
        Watch Our Story
      </button>
    </div>
  );
}

export default Video;