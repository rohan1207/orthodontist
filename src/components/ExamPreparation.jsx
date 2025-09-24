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

const examModules = [
  {
    id: 1,
    title: "Oral Pathology",
    downloads: 200,
    likes: 1200,
    questionPaperUrl: DEMO_DOWNLOAD,
    answerUrl: DEMO_DOWNLOAD,
  },
  {
    id: 2,
    title: "Prosthodontics",
    downloads: 180,
    likes: 980,
    questionPaperUrl: DEMO_DOWNLOAD,
    answerUrl: DEMO_DOWNLOAD,
  },
  {
    id: 3,
    title: "General Anatomy",
    downloads: 240,
    likes: 1320,
    questionPaperUrl: DEMO_DOWNLOAD,
    answerUrl: DEMO_DOWNLOAD,
  },
  {
    id: 4,
    title: "NEET MDS 2023 Paper",
    downloads: 320,
    likes: 2100,
    questionPaperUrl: DEMO_DOWNLOAD,
    answerUrl: DEMO_DOWNLOAD,
  },
  {
    id: 5,
    title: "Orthodontics",
    downloads: 205,
    likes: 1150,
    questionPaperUrl: DEMO_DOWNLOAD,
    answerUrl: DEMO_DOWNLOAD,
  },
  {
    id: 6,
    title: "Periodontics",
    downloads: 190,
    likes: 870,
    questionPaperUrl: DEMO_DOWNLOAD,
    answerUrl: DEMO_DOWNLOAD,
  },
];

const ExamCard = ({ module }) => {
  const [liked, setLiked] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="relative bg-white rounded-xl md:rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#006D5B]/10">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold text-[#006D5B] mb-4 line-clamp-1">
          {module.title}
        </h3>

        {/* Metrics */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCE6D5]/50 border border-[#006D5B]/15 text-[#006D5B]">
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
              {module.downloads}+ downloads
            </span>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#006D5B]/15 bg-white hover:bg-[#DCE6D5]/40 transition-colors"
          >
            {liked ? (
              <HeartSolid className="w-5 h-5 text-rose-500" />
            ) : (
              <HeartOutline className="w-5 h-5 text-[#006D5B]" />
            )}
            <span className="text-sm font-medium text-[#4B4B4B]">
              {(module.likes + (liked ? 1 : 0)).toLocaleString()}
            </span>
          </motion.button>
        </div>

        {/* Downloadables */}
        <div className="space-y-3">
          <a
            href={module.questionPaperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 w-full px-4 py-3 rounded-xl border border-[#006D5B]/15 bg-[#DCE6D5]/40 hover:bg-[#DCE6D5]/60 transition-colors"
          >
            <span className="flex items-center gap-3 text-[#006D5B] font-medium">
              <DocumentTextIcon className="w-5 h-5" />
              Question Paper
            </span>
            <span className="text-[#4B4B4B] text-sm">Download</span>
          </a>

          <a
            href={module.answerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 w-full px-4 py-3 rounded-xl border border-[#006D5B]/15 bg-[#DCE6D5]/40 hover:bg-[#DCE6D5]/60 transition-colors"
          >
            <span className="flex items-center gap-3 text-[#006D5B] font-medium">
              <CheckCircleIcon className="w-5 h-5" />
              Answer Sheet + Explanation
            </span>
            <span className="text-[#4B4B4B] text-sm">Download</span>
          </a>
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

        {/* Simplified layout - no stats block to keep focus on modules */}

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {examModules.map((module) => (
            <ExamCard key={module.id} module={module} />
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
        {/* Optional bottom CTA retained but simplified (can be removed if desired) */}
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
