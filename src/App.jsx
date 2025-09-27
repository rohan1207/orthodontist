import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home.jsx";
import NewNavbar from "./components/NewNavbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import BlogPage from "./pages/BlogPage.jsx";
import Footer from "./components/Footer.jsx";
import AcademicHelpPage from "./pages/AcademicHelpPage.jsx";
import ArticlesPage from "./pages/ArticlesPage.jsx";
import TopBooksPage from "./pages/TopBooksPage.jsx";
import ExamPreparationPage from "./pages/ExamPreparationPage.jsx";
import ExamPreparationTemplate from "./pages/ExamPreparationTemplate.jsx";
import TopicSummariesPage from "./pages/TopicSummariesPage.jsx";
import TopicSummariesTemplate from "./pages/TopicSummariesTemplate.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ArticleTemplate from "./pages/ArticleTemplate.jsx";

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
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/article/:id" element={<ArticleTemplate />} />
          <Route path="/top-books" element={<TopBooksPage />} />
          <Route path="/exam-prep" element={<ExamPreparationPage />} />
          <Route path="/exam-prep/:topicId" element={<ExamPreparationTemplate />} />
          <Route path="/summaries" element={<TopicSummariesPage />} />
          <Route path="/summaries/:topicId" element={<TopicSummariesTemplate />} />
          <Route path="/contact" element={<ContactPage />} />
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
    <div className="min-h-screen w-full bg-white overflow-x-hidden">
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
