// import React from 'react';
// import styled from 'styled-components';

// const features = [
//   { title: "User-Friendly Interface", image: "path/to/logo1.png" },
//   { title: "Secure Payments", image: "path/to/logo2.png" },
//   { title: "Multilingual Support", image: "path/to/logo3.png" },
//   { title: "Wide Range of Jobs", image: "path/to/logo4.png" },
//   { title: "Rating System", image: "path/to/logo5.png" }
// ];

// const Features = () => {
//   return (
//     <StyledWrapper>
//       <h1 className="text-4xl font-bold text-center mb-12">Features</h1>
//       <div className="gallery">
//         {features.map((feature, index) => (
//           <div key={index} className="feature-item">
//             <img src={feature.image} alt={feature.title} />
//             <div className="feature-title">{feature.title}</div>
//           </div>
//         ))}
//       </div>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   width: 100%;
//   padding: 2rem;
//   background-color: #f9f9f9;

//   .gallery {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//     gap: 2rem;
//     justify-items: center;
//   }

//   .feature-item {
//     width: 150px;
//     height: 150px;
//     position: relative;
//     transition: transform 0.3s ease-in-out;

//     &:hover {
//       transform: scale(1.1);
//     }

//     img {
//       width: 100%;
//       height: 100%;
//       object-fit: contain;
//       border-radius: 10px;
//     }

//     .feature-title {
//       position: absolute;
//       bottom: 10px;
//       left: 50%;
//       transform: translateX(-50%);
//       color: white;
//       background-color: rgba(0, 0, 0, 0.5);
//       padding: 5px 10px;
//       border-radius: 5px;
//       text-align: center;
//       width: 90%;
//     }
//   }
// `;

// export default Features;

import React from "react";

const FeatureCard = ({ icon, title, description, gradient, size }) => {
  return (
    <div
      className={`relative p-6 rounded-2xl shadow-lg bg-white border overflow-hidden transition-all hover:scale-105 ${gradient} ${size}`}
    >
      <div className="absolute inset-0 opacity-20 blur-lg" />
      <div className="relative z-10 flex flex-col gap-3">
        <div className="text-gray-700 text-3xl">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

const FeatureGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-4xl mx-auto">
      <FeatureCard
        icon="📊"
        title="Predictive Insights"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam placerat."
        gradient="bg-gradient-to-r from-white to-gray-100"
        size="col-span-1"
      />
      <FeatureCard
        icon="⚡"
        title="Fastest Speed"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam placerat."
        gradient="bg-gradient-to-r from-yellow-100 to-white"
        size="col-span-2"
      />
      <FeatureCard
        icon="📦"
        title="Filtered Data"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam placerat."
        gradient="bg-gradient-to-r from-gray-100 to-white"
        size="col-span-2"
      />
      <FeatureCard
        icon="☁️"
        title="Cloud Storage"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam placerat."
        gradient="bg-gradient-to-r from-blue-100 to-white"
        size="col-span-1"
      />
    </div>
  );
};

export default FeatureGrid;
