import React from "react";
import { motion } from "framer-motion";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { examTopics } from "../components/ExamPreparation.jsx";
import { ExamTopicCard } from "../components/ExamPreparation.jsx";

const ExamPreparationPage = () => {
  return (
    <div className="bg-[#F9F9F9] min-h-screen mt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-sm font-medium mb-4 border border-[#006D5B]/10">
            <AcademicCapIcon className="w-5 h-5" />
            Exam Preparation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#006D5B] mb-3">
            Exam Preparation Modules
          </h1>
          <p className="text-lg text-[#4B4B4B] max-w-3xl mx-auto">
            Browse topics, view year-wise papers, and download resources for your exam success.
          </p>
        </header>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {examTopics.map((topic) => (
            <ExamTopicCard key={topic.id} topic={topic} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExamPreparationPage;
