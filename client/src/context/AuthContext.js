import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";  // Use the configured axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage during context creation
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (phone, password) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("/login", { phone, password });
      const { user: userData, token } = response.data;

      // Set user state
      setUser(userData);

      // Store token and user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect to dashboard
      navigate(userData.role === "worker" ? "/dashboard" : "/jobprovoider");
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/');
  };

  // Check authentication status on mount and token change
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};