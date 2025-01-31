import React, { useState } from "react";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const testimonials = [
    {
      quote: "इस प्लेटफॉर्म ने काम ढूंढने का मेरा तरीका बदल दिया है! वीडियो ट्यूटोरियल ने इसे समझना बहुत आसान बना दिया।",
      quoteEn: "This platform has transformed how I find work! The video tutorials made it so simple to understand.",
      author: "Rajesh Patel",
      role: "Construction Worker",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"
    },
    {
      quote: "स्मार्टफोन के बिना भी, मैं आसानी से नौकरी के अवसरों तक पहुंच सकती हूं। प्लेटफॉर्म बहुत ही उपयोगकर्ता के अनुकूल है!",
      quoteEn: "Even without a smartphone, I can easily access job opportunities. The platform is very user-friendly!",
      author: "Priya Sharma",
      role: "Domestic Helper",
      avatar: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=1964&auto=format&fit=crop"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-base font-semibold text-blue-600 mb-4">DISCOVER OUR PLATFORM</h2>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-xl opacity-20"></div>
            <h3 className="relative text-4xl md:text-4xl font-bold text-gray-900 mb-6">
              How Our Platform Works
            </h3>
          </div>
          <p className="text-xl text-gray-600 mt-4">
            Watch our quick guide to understand how LabourHub connects workers with opportunities
          </p>
        </div>

        {/* Video Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-w-16 aspect-h-9">
              <video 
                className="w-full h-full object-cover"
                poster="your_video_thumbnail.jpg"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="path_to_your_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {!isPlaying && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center group cursor-pointer">
                <button 
                  className="bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300 rounded-full p-4 shadow-xl group-hover:shadow-2xl"
                  onClick={() => {
                    const video = document.querySelector('video');
                    video.play();
                  }}
                >
                  <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                {/* <p className="text-gray-700 leading-relaxed mb-3">
                  {testimonial.quote}
                </p> */}
                <p className="text-gray-600 leading-relaxed text-sm">
                  {testimonial.quoteEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="#story"
            className="relative inline-flex group"
          >
            <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
            <button className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-800">
              <span className="mr-3">Watch Our Story</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Video;
