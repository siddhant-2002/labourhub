import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Flex from "../components/Flex";
import About from "../components/About";
import Footer from "../components/Footer";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import RecommendedJobs from "../pages/dashboard/RecommendedJobs";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-white">
                <Header></Header>
                <Hero></Hero>
                <Flex />
                <About></About>
                <Footer></Footer>
              </div>
            }
          />
          <Route path="/dashboard" element={
          <>
            <Header />
            <RecommendedJobs />
            <Footer />
          </>
        } />
        </Routes>
      </Router>
    </div>
  );
};

export default Home;
