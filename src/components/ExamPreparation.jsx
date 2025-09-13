import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const examModules = [
  {
    id: 1,
    title: "NEET MDS Comprehensive",
    description: "Complete preparation strategy with past papers, MCQs, and expert guidance.",
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
    description: "Rapid review of high-yield topics with focused MCQ practice sessions.",
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
    description: "In-depth practice sessions focusing on individual subjects with detailed explanations.",
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
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ 
             background: `linear-gradient(to right, ${module.color.split(' ')[1]}, ${module.color.split(' ')[3]})`,
             filter: 'blur(8px)',
             zIndex: 0 
           }} 
      />
      
      <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-500">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-r opacity-90"
               style={{ background: `linear-gradient(to right, ${module.color.split(' ')[1]}, ${module.color.split(' ')[3]})` }}>
            <module.icon className="w-6 h-6 text-white" />
          </div>
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1"
          >
            <span className="text-2xl font-bold text-green-600">{module.successRate}</span>
            <span className="text-sm text-gray-500">success</span>
          </motion.div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
        <p className="text-gray-600 mb-6 line-clamp-2">{module.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-500">Duration</div>
            <div className="font-semibold text-gray-700">{module.duration}</div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-sm text-gray-500">Students</div>
            <div className="font-semibold text-gray-700">{module.students}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Subjects</div>
            <div className="font-semibold text-gray-700">{module.subjects}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: module.successRate }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute h-full rounded-full"
            style={{ 
              background: `linear-gradient(to right, ${module.color.split(' ')[1]}, ${module.color.split(' ')[3]})`,
            }}
          />
        </div>

        {/* Action Button */}
        <Link
          to={`/exam-prep/${module.id}`}
          className="group relative w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-xl text-white transition-all duration-200"
          style={{ 
            background: `linear-gradient(to right, ${module.color.split(' ')[1]}, ${module.color.split(' ')[3]})`,
          }}
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
      className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg"
    >
      <Icon className="w-8 h-8 text-green-500 mb-2" />
      <motion.span
        className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent"
      >
        {value}
      </motion.span>
      <span className="text-sm text-gray-600">{label}</span>
    </motion.div>
  );
};

export default function ExamPreparation() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-4"
          >
            <AcademicCapIcon className="w-5 h-5" />
            Exam Preparation
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Your Path to NEET MDS Success
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Structured preparation modules designed by top educators with proven success rates.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatsCounter value="15k+" label="Active Students" icon={UserGroupIcon} />
          <StatsCounter value="92%" label="Success Rate" icon={ChartBarIcon} />
          <StatsCounter value="50+" label="Mock Tests" icon={DocumentTextIcon} />
          <StatsCounter value="24/7" label="Expert Support" icon={ClockIcon} />
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examModules.map((module) => (
            <ExamCard key={module.id} module={module} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            to="/exam-preparation"
            className="group inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-lg"
          >
            View All Preparation Modules
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
