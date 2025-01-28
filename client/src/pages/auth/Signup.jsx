import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, User, Phone, ArrowRight } from "lucide-react";
import axios from "axios";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
    phone: "",
    role: "",
  });

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
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        credentials
      );
      console.log(response);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-md w-full bg-white space-y-8 p-8 rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A3DFFF] via-[#FFB3F0] to-[#FFB3B3] blur-lg filter opacity-30 rounded-2xl"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">
            Join our community and start exploring opportunities
          </p>
        </div>

        <form className="relative z-10 mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44BCFF] focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number
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
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44BCFF] focus:border-transparent"
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44BCFF] focus:border-transparent"
                  placeholder="Choose a password"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Register As
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  required
                  value={credentials.role}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44BCFF] focus:border-transparent"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="jobProvider">Job Provider</option>
                  <option value="worker">Worker</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-[#44BCFF] focus:ring-[#44BCFF] border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <Link
                to="/terms&condition"
                className="font-medium text-[#3ca4dc] hover:text-[#2f1f57]"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/terms&condition"
                className="font-medium text-[#3ca4dc] hover:text-[#2f1f57]"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <div className="w-full relative inline-flex mt-5 group">
            <div className="w-full absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#A3DFFF] via-[#FFB3F0] to-[#FFB3B3] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

            <button
              type="submit"
              className="w-full relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#3ca4dc] hover:text-[#2f1f57]"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;