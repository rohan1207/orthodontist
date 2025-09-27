import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import {
  HeartIcon as HeartOutline,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

// Convert Google Drive view link to direct download link for demo
const DRIVE_ID = "1f3Yo89FL59rsUwpT6KH8kaVDMDylU5el";
const DEMO_DOWNLOAD = `https://drive.google.com/uc?export=download&id=${DRIVE_ID}`;

// New data model: question papers only for now (answers via note)
const yearsRange = Array.from({ length: 7 }, (_, i) => 2014 + i);
const makeYears = () => yearsRange.map((year) => ({
  year,
  questionPaperUrl: DEMO_DOWNLOAD,
  answerSheetUrl: null,
  answersNote: "For answer sheets, please contact us.",
}));

export const examTopics = [
  {
    id: "paper-1",
    name: "Paper I – Basic Sciences",
    description: "Paper I 2014–2020 combined question paper.",
    years: makeYears(),
    downloadUrl: DEMO_DOWNLOAD,
    answersNote: "For answer sheets, please contact us.",
  },
  {
    id: "paper-2",
    name: "Paper II – Clinical",
    description: "Paper II 2014–2020 combined question paper.",
    years: makeYears(),
    downloadUrl: DEMO_DOWNLOAD,
    answersNote: "For answer sheets, please contact us.",
  },
  {
    id: "paper-3",
    name: "Paper III – Orthodontics MCQ",
    description: "Paper III 2014–2020 combined question paper.",
    years: makeYears(),
    downloadUrl: DEMO_DOWNLOAD,
    answersNote: "For answer sheets, please contact us.",
  },
  {
    id: "paper-4",
    name: "Paper IV – Descriptive & Analytical",
    description: "Paper IV D&A 2014–2020 combined question paper.",
    years: makeYears(),
    downloadUrl: DEMO_DOWNLOAD,
    answersNote: "For answer sheets, please contact us.",
  },
];


// Card for each topic/paper
import { useNavigate } from "react-router-dom";
export const ExamTopicCard = ({ topic }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group cursor-pointer"
      onClick={() => navigate(`/exam-prep/${topic.id}`)}
    >
      <div className="relative bg-white rounded-xl md:rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#006D5B]/10">
        <h3 className="text-lg md:text-xl font-semibold text-[#006D5B] mb-2 line-clamp-1">
          {topic.name}
        </h3>
        <p className="text-[#4B4B4B] text-sm mb-4 line-clamp-2">{topic.description}</p>
        <div className="flex flex-col gap-2">
          <a
            href={topic.downloadUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            download
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#006D5B] text-white text-sm font-semibold hover:bg-[#005c4d] transition-colors"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Download question paper
          </a>
          <span className="text-xs text-[#4B4B4B]">
            {topic.answersNote || "For answer sheets, please contact us."}
          </span>
        </div>
      </div>
    </motion.div>
  );
};


export default function ExamPreparation() {
  return (
    <section className="py-16 md:py-24 bg-[#DCE6D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-sm font-medium mb-4 border border-[#006D5B]/10"
          >
            <AcademicCapIcon className="w-5 h-5" />
            Exam Preparation
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-[#006D5B] mb-3 md:mb-4"
          >
            Your Path to NEET MDS Success
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base md:text-xl text-[#4B4B4B] max-w-3xl mx-auto"
          >
            Structured preparation modules designed by top educators with proven
            success rates.
          </motion.p>
        </div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {examTopics.map((topic) => (
            <ExamTopicCard key={topic.id} topic={topic} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <Link
            to="/exam-prep"
            className="group inline-flex items-center gap-2 text-[#006D5B] hover:text-[#006D5B]/80 font-semibold text-base md:text-lg"
          >
            View All Preparation Modules
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
        {/* Optional bottom CTA retained but simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-[#006D5B] text-white py-12 px-4 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need help picking modules?
          </h3>
          <p className="text-base md:text-lg mb-6 text-white/90">
            We’ll guide you to the right topic based on your exam plan.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-[#006D5B] bg-white rounded-xl font-semibold hover:bg-[#DCE6D5] transition-all duration-300"
          >
            Talk to Us
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
