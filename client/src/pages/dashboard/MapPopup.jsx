import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Search } from 'lucide-react';

const MapPopup = ({ jobLocation, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState([18.5204, 73.8567]); // Default position
  const [address, setAddress] = useState(jobLocation);

  const handleSearch = async () => {
    if (!searchQuery) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const location = data[0];
        setPosition([parseFloat(location.lat), parseFloat(location.lon)]);
        setAddress(location.display_name);
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Failed to fetch location");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[50%] md:w-3/4 lg:w-1/2 h-[40%] relative flex flex-col overflow-hidden border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 rounded-full p-3 shadow-md transition-all"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
        
        {/* Header */}
        <div className="bg-blue-600 text-white text-xl font-semibold py-4 text-center shadow-md rounded-t-2xl">
          Job Location
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center p-3 bg-gray-100">
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        
        {/* Map Container */}
        <div className="flex-grow">
          <MapContainer center={position} zoom={13} className="h-full w-full rounded-b-2xl">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>{address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapPopup;