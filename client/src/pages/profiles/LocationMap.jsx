import React, { useEffect, useRef } from "react";

const LocationMap = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!window.H) {
      console.error("HERE Maps script not loaded");
      return;
    }

    const platform = new window.H.service.Platform({
      apikey: "YOUR_HERE_MAPS_API_KEY", // 🔹 Replace with your API Key
    });

    const defaultLayers = platform.createDefaultLayers();
    const map = new window.H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: latitude, lng: longitude },
        zoom: 14, // Adjust zoom as needed
      }
    );

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    window.H.ui.UI.createDefault(map, defaultLayers);

    mapInstance.current = map;

    // Add marker to the given location
    const marker = new window.H.map.Marker({ lat: latitude, lng: longitude });
    map.addObject(marker);
    markerRef.current = marker;

    return () => map.dispose(); // Cleanup when component unmounts
  }, [latitude, longitude]); // 🔹 Re-render when coordinates change

  return (
    <div className="w-full max-w-4xl h-[400px] border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default LocationMap;
