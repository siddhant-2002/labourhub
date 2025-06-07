import React, { useEffect, useRef, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HereMapComponent = ({ onLocationSelect, onClose }) => {
  const mapRef = useRef(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState(null);
  const mapInstance = useRef(null);
  const searchService = useRef(null);
  const markerRef = useRef(null);

  const handleMapClick = useCallback((coord) => {
    const { lat, lng } = coord;
    setLocation({ lat, lng });

    if (mapInstance.current) {
      mapInstance.current.setCenter({ lat, lng });
      mapInstance.current.setZoom(14);
      updateMarker({ lat, lng });
    }

    reverseGeocode(lat, lng);
  }, []);

  const reverseGeocode = (lat, lng) => {
    searchService.current.reverseGeocode(
      {
        at: `${lat},${lng}`
      },
      (result) => {
        if (result.items && result.items.length > 0) {
          const address = result.items[0].address.label;
          setQuery(address);
        } else {
          setQuery(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
        }
      },
      (error) => {
        console.error("Reverse geocode error:", error);
        setQuery(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
      }
    );
  };

  useEffect(() => {
    if (!window.H) {
      console.error("HERE Maps script not loaded");
      return;
    }

    const platform = new window.H.service.Platform({
      apikey: "SGP1Yvog97gzUlMjM8NNQBRwEp8xYxsnW0LHs9iWYX0", // Replace with your API Key
    });

    searchService.current = platform.getSearchService();
    const defaultLayers = platform.createDefaultLayers();
    const map = new window.H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 19.076, lng: 72.8777 }, // Default: Mumbai
        zoom: 10,
      }
    );

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    window.H.ui.UI.createDefault(map, defaultLayers);

    map.addEventListener('tap', (evt) => {
      const coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
      handleMapClick(coord);
    });

    mapInstance.current = map;

    return () => map.dispose();
  }, [handleMapClick]);

  // Function to update the marker position
  const updateMarker = (position) => {
    if (mapInstance.current) {
      if (markerRef.current) {
        mapInstance.current.removeObject(markerRef.current);
      }
      const marker = new window.H.map.Marker(position);
      mapInstance.current.addObject(marker);
      markerRef.current = marker;
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      searchService.current.geocode(
        { q: value },
        (result) => {
          if (result.items && result.items.length > 0) {
            setSuggestions(result.items);
          }
        },
        (error) => console.error("Geocode error:", error)
      );
    } else {
      setSuggestions([]);
    }
  };

  // Handle search selection
  const handleSelectLocation = (location) => {
    const { lat, lng } = location.position;
    setLocation({ lat, lng });

    if (mapInstance.current) {
      mapInstance.current.setCenter({ lat, lng });
      mapInstance.current.setZoom(14);
      updateMarker({ lat, lng });
    }

    setQuery(location.title);
    setSuggestions([]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      return toast.error("Please select a location");
    }
  
    onLocationSelect({ location, address: query });
    // console.log("Selected Location:", location, query);
    onClose(); // Close the modal or perform any other action
    toast.success("Location saved successfully");
  };

  return (
    <div className="flex flex-col items-center w-full">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Select Job Location</h2>
      {/* Search Box */}
      <div className="relative w-full max-w-md mb-4">
        <input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={handleSearchChange}
          className="w-full p-3 text-gray-900 rounded-lg shadow-md outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        
        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelectLocation(item)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map Container */}
      <div className="w-full h-[500px] max-w-4xl shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        <div ref={mapRef} className="w-full h-full" />
      </div>

      {location && (
        <div className="mt-4 text-center">
          <p><strong>Selected Location:</strong></p>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Save Location
      </button>
    </div>
  );
};

export default HereMapComponent;