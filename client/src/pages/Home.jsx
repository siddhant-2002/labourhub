import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Flex from "../components/Flex";
import Video from "../components/Video";
import Faq from "../components/Faq";
import Contactus from "../components/Contactus";
import Footer from "../components/Footer";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import RecommendedJobs from "./dashboard/RecommendedJobs";
import Loader from "../components/Loader";
import Aboutus from "./about/Aboutus";
import WorkerProfile from "./profiles/WorkerProfile";
import ProviderProfile from "./profiles/ProvoiderProfile";
import Features from "./features/Features";
import Language from "../components/Language";
import { AuthProvider } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import JobProvider from "./dashboard/JobProvoider";
import translatePage from "../utils/translate";
import RouteChangeListener from "../utils/routChange"; // Import RouteChangeListener
import ShowProfile from "./profiles/ShowProfile";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");
  const isLoggedIn = !!token;

  let user = null;
  if (token) {
    user = jwtDecode(token);
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Memoize translatePage to prevent unnecessary re-renders
  const handleRouteChange = useCallback(() => {
    translatePage();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <AuthProvider>
        <RouteChangeListener onRouteChange={handleRouteChange} />
        <Header user={user} />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <>
                <Hero isLoggedIn={isLoggedIn} />
                <Flex />
                <Video />
                <Faq />
                <Contactus />
              </>
            }
          />
          <Route path="/profile" element={<ShowProfile />} />
          <Route path="/workerprofile" element={<WorkerProfile />} />
          <Route path="/provoiderprofile" element={<ProviderProfile />} />
          <Route path="/dashboard" element={<RecommendedJobs />} />
          <Route path="/jobprovoider" element={<JobProvider />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/features" element={<Features />} />
          <Route path="/language" element={<Language />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </div>
  );
};

export default Home;
