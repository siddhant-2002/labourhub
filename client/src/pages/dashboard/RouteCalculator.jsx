/* global H */
import React, { useEffect, useRef, useState } from "react";


const RouteCalculator = ({ workerLocation, providerLocation, onClose }) => {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [eta, setEta] = useState(null);
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null); // Handle missing coordinates or API failures

  useEffect(() => {
    // 🛑 Check if coordinates are missing and show an error message instead of running the function
    if (!workerLocation || !providerLocation) {
      setError("❌ Coordinates not available. Please check worker & provider locations.");
      setLoading(false);
      return;
    }

    setError(null); // Clear any previous errors

    // Load HERE Maps Platform
    const platform = new H.service.Platform({
      apikey: "SGP1Yvog97gzUlMjM8NNQBRwEp8xYxsnW0LHs9iWYX0", // Secure the API key
    });

    const defaultLayers = platform.createDefaultLayers();

    // Clear previous map instance
    if (mapRef.current && mapRef.current.innerHTML) {
      mapRef.current.innerHTML = "";
    }

    const map = new H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: workerLocation,
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    // Enable user interactions
    new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    H.ui.UI.createDefault(map, defaultLayers);

    const router = platform.getRoutingService();

    // Calculate the route
    const calculateRoute = () => {
      setLoading(true);

      const routingParameters = {
        mode: "fastest;car",
        waypoint0: `geo!${workerLocation.lat},${workerLocation.lng}`,
        waypoint1: `geo!${providerLocation.lat},${providerLocation.lng}`,
        representation: "display",
      };

      router.calculateRoute(
        routingParameters,
        (result) => {
          if (result.response.route) {
            const route = result.response.route[0];
            const routeLine = new H.geo.LineString();

            route.shape.forEach((point) => {
              const [lat, lng] = point.split(",");
              routeLine.pushLatLngAlt(lat, lng);
            });

            // Draw the route on the map
            const polyline = new H.map.Polyline(routeLine, {
              style: { strokeColor: "blue", lineWidth: 4 },
            });

            map.addObject(polyline);
            map.getViewModel().setLookAtData({ bounds: polyline.getBoundingBox() });

            // Set ETA and distance
            const { travelTime, distance } = route.summary;
            setEta(Math.round(travelTime / 60)); // Convert seconds to minutes
            setDistance((distance / 1000).toFixed(2)); // Convert meters to km
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error calculating route:", error);
          setError("Failed to fetch route. Please try again.");
          setLoading(false);
        }
      );
    };

    calculateRoute();

    return () => {
      map.dispose(); // Cleanup map on component unmount
    };
  }, [workerLocation, providerLocation]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-2xl shadow-xl max-w-4xl w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Worker Route Tracker</h2>

        <div className="w-full h-[500px] border border-gray-300 rounded-lg shadow-md overflow-hidden">
          {error ? (
            <div className="flex items-center justify-center h-full text-lg font-semibold text-red-600">
              {error}
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-full text-lg font-semibold text-gray-500">
              Loading map...
            </div>
          ) : (
            <div ref={mapRef} className="w-full h-full" />
          )}
        </div>

        {eta && distance && !loading && !error && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg w-full text-center">
            <p className="text-lg font-semibold text-gray-700">
              🚗 Estimated Time: <span className="text-blue-600">{eta} mins</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              📍 Distance: <span className="text-green-600">{distance} km</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteCalculator;
