import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  HeartIcon as HeartOutline,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

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

function ModuleCard({ module }) {
  const [liked, setLiked] = useState(false);
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#006D5B]/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#006D5B] mb-4 line-clamp-1">
          {module.title}
        </h3>
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
}

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
            Each module provides two simple, downloadable resources.
          </p>
        </header>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {examModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExamPreparationPage;
