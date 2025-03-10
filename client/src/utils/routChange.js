import  { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteChangeListener = ({ onRouteChange }) => {
  const location = useLocation();

  useEffect(() => {
    onRouteChange();
  }, [location, onRouteChange]);

  return null;
};

export default RouteChangeListener;