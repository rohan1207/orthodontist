import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  ClockIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const examModules = [
  {
    id: 1,
    title: "NEET MDS Comprehensive",
    description:
      "Complete preparation strategy with past papers, MCQs, and expert guidance.",
    duration: "6 months",
    students: "2.5k+",
    successRate: "92%",
    subjects: 12,
    icon: AcademicCapIcon,
    color: "from-green-500 to-emerald-600",
    shadowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    id: 2,
    title: "Quick Revision Series",
    description:
      "Rapid review of high-yield topics with focused MCQ practice sessions.",
    duration: "2 months",
    students: "1.8k+",
    successRate: "88%",
    subjects: 8,
    icon: ClockIcon,
    color: "from-blue-500 to-cyan-600",
    shadowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: 3,
    title: "Subject Wise Practice",
    description:
      "In-depth practice sessions focusing on individual subjects with detailed explanations.",
    duration: "4 months",
    students: "3.2k+",
    successRate: "95%",
    subjects: 15,
    icon: DocumentTextIcon,
    color: "from-purple-500 to-indigo-600",
    shadowColor: "rgba(147, 51, 234, 0.15)",
  },
];

const ExamCard = ({ module }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div
        className="absolute -inset-0.5 rounded-xl md:rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, ${
            module.color.split(" ")[1]
          }, ${module.color.split(" ")[3]})`,
          filter: "blur(8px)",
          zIndex: 0,
        }}
      />

      <div className="relative bg-white rounded-xl md:rounded-2xl p-5 md:p-7 shadow-lg hover:shadow-xl transition-all duration-500 min-h-[340px] md:min-h-[360px] border border-[#006D5B]/10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <div
            className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-[#006D5B] shadow-lg"
          >
            <module.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-[#DCE6D5]/50 px-3 py-1 rounded-full"
          >
            <span className="text-xl md:text-2xl font-bold text-[#006D5B]">
              {module.successRate}
            </span>
            <span className="text-sm text-[#4B4B4B]">success</span>
          </motion.div>
        </div>

        {/* Content */}
        <h3 className="text-lg md:text-xl font-semibold text-[#006D5B] mb-1 md:mb-2 line-clamp-1">
          {module.title}
        </h3>
        <p className="text-sm md:text-base text-[#4B4B4B] mb-4 md:mb-6 line-clamp-2">
          {module.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
          <div className="text-center">
            <div className="text-sm text-[#4B4B4B]">Duration</div>
            <div className="text-sm md:text-base font-semibold text-[#006D5B]">
              {module.duration}
            </div>
          </div>
          <div className="text-center border-x border-[#006D5B]/10">
            <div className="text-sm text-[#4B4B4B]">Students</div>
            <div className="text-sm md:text-base font-semibold text-[#006D5B]">
              {module.students}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-[#4B4B4B]">Subjects</div>
            <div className="text-sm md:text-base font-semibold text-[#006D5B]">
              {module.subjects}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1 md:h-1.5 bg-[#DCE6D5] rounded-full overflow-hidden mb-4 md:mb-6">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: module.successRate }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute h-full rounded-full bg-[#006D5B]"
          />
        </div>

        {/* Action Button */}
        <Link
          to={`/exam-prep/${module.id}`}
          className="group relative w-full inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 text-sm font-medium rounded-lg md:rounded-xl text-white transition-all duration-200 bg-[#006D5B] hover:bg-[#006D5B]/90"
        >
          Explore Module
          <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

const StatsCounter = ({ value, label, icon: Icon }) => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-[#006D5B]/10 hover:shadow-xl transition-shadow duration-300"
    >
      <Icon className="w-8 h-8 text-[#006D5B] mb-3" />
      <motion.span 
        className="text-3xl font-bold text-[#006D5B]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {value}
      </motion.span>
      <span className="text-sm text-[#4B4B4B] mt-1">{label}</span>
    </motion.div>
  );
};

export default function ExamPreparation() {
  return (
    <section className="py-16 md:py-24 bg-[#DCE6D5]/30">
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          <StatsCounter
            value="15k+"
            label="Active Students"
            icon={UserGroupIcon}
          />
          <StatsCounter value="92%" label="Success Rate" icon={ChartBarIcon} />
          <StatsCounter
            value="50+"
            label="Mock Tests"
            icon={DocumentTextIcon}
          />
          <StatsCounter value="24/7" label="Expert Support" icon={ClockIcon} />
        </div>

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
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-[#006D5B] text-white py-12 px-4 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your NEET MDS Journey?</h3>
          <p className="text-base md:text-lg mb-6 text-white/90">Join thousands of successful candidates who trusted our preparation modules.</p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-[#006D5B] bg-white rounded-xl font-semibold hover:bg-[#DCE6D5] transition-all duration-300"
          >
            Get Started Today
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
