import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AcademicCapIcon,
  ClockIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const examModules = [
  {
    id: 1,
    title: "NEET MDS Comprehensive",
    description:
      "Complete preparation strategy with past papers, MCQs, and expert guidance.",
    durationMonths: 6,
    students: 2500,
    successRate: 92,
    subjects: 12,
    type: "Comprehensive",
    color: "from-green-500 to-emerald-600",
    icon: AcademicCapIcon,
  },
  {
    id: 2,
    title: "Quick Revision Series",
    description:
      "Rapid review of high-yield topics with focused MCQ practice sessions.",
    durationMonths: 2,
    students: 1800,
    successRate: 88,
    subjects: 8,
    type: "Revision",
    color: "from-blue-500 to-cyan-600",
    icon: ClockIcon,
  },
  {
    id: 3,
    title: "Subject Wise Practice",
    description:
      "In-depth practice sessions focusing on individual subjects with detailed explanations.",
    durationMonths: 4,
    students: 3200,
    successRate: 95,
    subjects: 15,
    type: "Practice",
    color: "from-purple-500 to-indigo-600",
    icon: DocumentTextIcon,
  },
  // Additional examples
  {
    id: 4,
    title: "Mock Test Marathon",
    description:
      "Timed tests with analytics and adaptive difficulty to mirror exam pressure.",
    durationMonths: 1,
    students: 2200,
    successRate: 86,
    subjects: 10,
    type: "Mock Tests",
    color: "from-rose-500 to-pink-600",
    icon: ChartBarIcon,
  },
];

function ModuleCard({ module }) {
  const typeStyles = {
    Comprehensive: {
      icon: AcademicCapIcon,
      bgColor: "bg-[#006D5B]/10",
      textColor: "text-[#006D5B]",
      progressColor: "bg-[#006D5B]",
    },
    Revision: {
      icon: ClockIcon,
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      progressColor: "bg-blue-500",
    },
    Practice: {
      icon: DocumentTextIcon,
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
      progressColor: "bg-purple-500",
    },
    "Mock Tests": {
      icon: ChartBarIcon,
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      progressColor: "bg-red-500",
    },
  };

  const style = typeStyles[module.type] || typeStyles.Comprehensive;
  const Icon = style.icon;

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#006D5B]/10 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${style.bgColor}`}>
            <Icon className={`w-7 h-7 ${style.textColor}`} />
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${style.textColor}`}>
              {module.successRate}%
            </div>
            <div className="text-xs text-[#4B4B4B]/70">Success Rate</div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-[#006D5B] line-clamp-2 mb-2 min-h-[3.5rem]">
          {module.title}
        </h3>
        <p className="text-sm text-[#4B4B4B] line-clamp-2 mb-6 min-h-[2.5rem]">
          {module.description}
        </p>

        <div className="grid grid-cols-3 gap-4 text-center border-t border-dashed border-[#006D5B]/10 pt-4">
          <div>
            <div className="text-2xl font-bold text-[#4B4B4B]">
              {module.durationMonths}
            </div>
            <div className="text-xs text-[#4B4B4B]/70">Months</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#4B4B4B]">
              {module.students / 1000}k+
            </div>
            <div className="text-xs text-[#4B4B4B]/70">Students</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#4B4B4B]">
              {module.subjects}
            </div>
            <div className="text-xs text-[#4B4B4B]/70">Subjects</div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <a
          href={`/exam-prep/${module.id}`}
          className="block w-full text-center px-6 py-3.5 text-base font-semibold text-white rounded-xl transition-all duration-300 shadow-lg bg-[#006D5B] hover:bg-[#005c4d] hover:scale-102"
        >
          Explore Module
        </a>
      </div>
    </motion.div>
  );
}

const ExamPreparationPage = () => {
  const [modules, setModules] = useState(examModules);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    let filteredModules = examModules.filter((module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (typeFilter !== "all") {
      filteredModules = filteredModules.filter(
        (module) => module.type === typeFilter
      );
    }

    if (sortOrder === "success") {
      filteredModules.sort((a, b) => b.successRate - a.successRate);
    } else if (sortOrder === "duration") {
      filteredModules.sort((a, b) => a.durationMonths - b.durationMonths);
    }

    setModules(filteredModules);
  }, [searchTerm, sortOrder, typeFilter]);

  const uniqueTypes = ["all", ...new Set(examModules.map((m) => m.type))];

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#006D5B] mb-3">
            Exam Preparation Modules
          </h1>
          <p className="text-lg text-[#4B4B4B] max-w-3xl mx-auto">
            Your comprehensive guide to mastering dental exams. Explore our
            specialized modules designed for success.
          </p>
        </header>

        <div className="mb-10 p-4 bg-white rounded-2xl shadow-sm border border-[#006D5B]/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative md:col-span-1">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-base bg-[#F9F9F9] border-transparent rounded-xl focus:ring-2 focus:ring-[#006D5B] focus:border-transparent transition-all"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-3 text-base bg-[#F9F9F9] border-transparent rounded-xl focus:ring-2 focus:ring-[#006D5B] focus:border-transparent transition-all"
              >
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Module Types" : type}
                  </option>
                ))}
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-3 text-base bg-[#F9F9F9] border-transparent rounded-xl focus:ring-2 focus:ring-[#006D5B] focus:border-transparent transition-all"
              >
                <option value="default">Sort by Default</option>
                <option value="success">Sort by Success Rate</option>
                <option value="duration">Sort by Duration</option>
              </select>
            </div>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </motion.div>
        </AnimatePresence>

        {modules.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-block p-6 bg-white rounded-full shadow-md mb-6">
              <DocumentMagnifyingGlassIcon className="w-16 h-16 text-[#006D5B]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#006D5B]">
              No Modules Found
            </h3>
            <p className="text-[#4B4B4B] mt-2">
              Try adjusting your search or filter criteria.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ExamPreparationPage;
