import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteChangeListener = ({ onRouteChange = () => {} }) => {
  const location = useLocation();

  useEffect(() => {
    onRouteChange();
  }, [location.pathname,onRouteChange]); // Trigger only on path change

  return null;
};

export default RouteChangeListener;
