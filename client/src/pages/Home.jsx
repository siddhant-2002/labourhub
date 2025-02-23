import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ProvoiderProfile from "./profiles/ProvoiderProfile";
import Features from "./features/Features";
import { AuthProvider } from "../context/AuthContext";

import { jwtDecode } from "jwt-decode";
import JobProvider from "./dashboard/JobProvoider";
// import ProfileDropdown from "../components/ProfileDropdown";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");
  const isLoggedIn = token ? true : false;

  let user = null;
  if (token) {
    user = jwtDecode(token);
  }

  // console.log(user);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen ">
      <Router>
        <AuthProvider>
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
            <Route path="/workerprofile" element={<WorkerProfile />} />
            <Route path="/provoiderprofile" element={<ProvoiderProfile />} />
            <Route path="/dashboard" element={<RecommendedJobs />} />
            <Route path="/jobprovoider" element={<JobProvider />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/features" element={<Features />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
};

export default Home;
