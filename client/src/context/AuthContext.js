import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (phone, password) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/login", { phone, password });

      // Set user state
      setUser(response.data.user);

      // Store token and user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to dashboard
      navigate(response.data.user.role === "worker" ? "/dashboard" : "/jobprovoider");
      return true; // Indicate success
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login. Please try again."
      );
      return false; // Indicate failure
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if user data exists in localStorage (for persistence)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const logout = () => {
    setUser(null);
    setError("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};