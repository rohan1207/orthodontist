import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home.jsx";
import NewNavbar from "./components/NewNavbar.jsx";


import BlogPage from "./pages/BlogPage.jsx";
import Footer from "./components/Footer.jsx";
import AcademicHelpPage from "./pages/AcademicHelpPage.jsx";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <NewNavbar />
      <AnimatePresence initial={false} mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/academic-help" element={<AcademicHelpPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <div className="w-full text-center py-4 text-gray-400 text-xs font-light">
        Designed and developed by TheSocialKollab
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
