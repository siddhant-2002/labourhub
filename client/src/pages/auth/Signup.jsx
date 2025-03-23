import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, User, Phone, ArrowRight, Loader2, Briefcase } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
    phone: "",
    role: "worker", // Default role
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await axios.post("http://localhost:3000/signup", credentials);
      toast.success("User created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      // console.error("Signup error:", err);
      setError(
        err.response?.data?.message || 
        "An error occurred during signup. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <ToastContainer />
      <div className="relative max-w-md w-full space-y-8">
        {/* Main Card */}
        <div className="relative bg-white p-8 rounded-2xl shadow-xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#A3DFFF]/20 via-[#FFB3F0]/20 to-[#FFB3B3]/20 rounded-2xl"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 font-pj">Create Account</h2>
              <p className="mt-2 text-sm text-gray-600 font-inter">
                Join our community and start exploring opportunities
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={credentials.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={credentials.phone}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  {/* <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhar Card Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="aadhar"
                      name="aadhar"
                      type="number"
                      required
                      value={credentials.aadharcard}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400"
                      placeholder="Enter your phone number"
                    />
                  </div> */}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={credentials.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400"
                      placeholder="Create a password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    I am a
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="role"
                      name="role"
                      required
                      value={credentials.role}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="worker">Worker</option>
                      <option value="employer">work provoider</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;