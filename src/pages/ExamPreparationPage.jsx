import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AcademicCapIcon,
  ClockIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  Squares2X2Icon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const MODULES = [
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

const TYPES = ["All", "Comprehensive", "Revision", "Practice", "Mock Tests"];
const SORTS = [
  { id: "success-desc", label: "Success rate • High → Low" },
  { id: "success-asc", label: "Success rate • Low → High" },
  { id: "duration-asc", label: "Duration • Short → Long" },
  { id: "duration-desc", label: "Duration • Long → Short" },
  { id: "students-desc", label: "Students • High → Low" },
];

function GridCard({ m }) {
  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full">
        <div className="flex items-start justify-between mb-6">
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${m.color} opacity-90`}
          >
            <m.icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-green-600">
              {m.successRate}%
            </span>
            <span className="text-sm text-gray-500">success</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{m.title}</h3>
        <p className="text-gray-600 mt-1 line-clamp-2">{m.description}</p>
        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="text-center">
            <div className="text-sm text-gray-500">Duration</div>
            <div className="font-semibold text-gray-700">
              {m.durationMonths} months
            </div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-sm text-gray-500">Students</div>
            <div className="font-semibold text-gray-700">
              {m.students.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Subjects</div>
            <div className="font-semibold text-gray-700">{m.subjects}</div>
          </div>
        </div>
        <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${m.successRate}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute h-full rounded-full"
            style={{
              background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
            }}
          />
        </div>
        <Link
          to={`/exam-prep/${m.id}`}
          className="group w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600"
        >
          Explore Module
          <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

function ListCard({ m }) {
  return (
    <motion.div
      className="w-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${m.color} opacity-90`}
          >
            <m.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{m.title}</h3>
            <p className="text-gray-600 mt-1 md:max-w-2xl">{m.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="w-4 h-4" /> {m.durationMonths} months
              </span>
              <span className="inline-flex items-center gap-1">
                <UserGroupIcon className="w-4 h-4" />{" "}
                {m.students.toLocaleString()} students
              </span>
              <span className="inline-flex items-center gap-1">
                <DocumentTextIcon className="w-4 h-4" /> {m.subjects} subjects
              </span>
              <span className="inline-flex items-center gap-1">
                <ChartBarIcon className="w-4 h-4" /> {m.successRate}% success
              </span>
            </div>
          </div>
        </div>
        <Link
          to={`/exam-prep/${m.id}`}
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
        >
          Explore Module <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ExamPreparationPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [sortBy, setSortBy] = useState("success-desc");
  const [view, setView] = useState("grid");
  const [visible, setVisible] = useState(12);

  const modules = useMemo(() => {
    let list = [...MODULES];
    if (type !== "All") list = list.filter((m) => m.type === type);

    const s = q.trim().toLowerCase();
    if (s)
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(s) ||
          m.description.toLowerCase().includes(s)
      );

    switch (sortBy) {
      case "success-desc":
        list.sort((a, b) => b.successRate - a.successRate);
        break;
      case "success-asc":
        list.sort((a, b) => a.successRate - b.successRate);
        break;
      case "duration-asc":
        list.sort((a, b) => a.durationMonths - b.durationMonths);
        break;
      case "duration-desc":
        list.sort((a, b) => b.durationMonths - a.durationMonths);
        break;
      case "students-desc":
        list.sort((a, b) => b.students - a.students);
        break;
      default:
        break;
    }

    return list;
  }, [q, type, sortBy]);

  const visibleList = modules.slice(0, visible);
  const canLoadMore = visible < modules.length;

  return (
    <div className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-3">
            All Preparation Modules
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search, filter, and compare modules to craft your ideal NEET MDS
            prep plan.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search modules..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Type filter */}
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                    type === t
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <FunnelIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {SORTS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View toggle */}
            <div className="inline-flex rounded-xl overflow-hidden border border-gray-200">
              <button
                className={`px-3 py-2 text-sm ${
                  view === "grid"
                    ? "bg-green-50 text-green-700"
                    : "bg-white text-gray-600"
                }`}
                onClick={() => setView("grid")}
                aria-label="Grid view"
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                className={`px-3 py-2 text-sm border-l border-gray-200 ${
                  view === "list"
                    ? "bg-green-50 text-green-700"
                    : "bg-white text-gray-600"
                }`}
                onClick={() => setView("list")}
                aria-label="List view"
              >
                <Bars3BottomLeftIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Reset */}
            <button
              className="px-3 py-2 text-sm rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              onClick={() => {
                setQ("");
                setType("All");
                setSortBy("success-desc");
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mb-6 text-sm text-gray-500">
          {modules.length} modules
        </div>

        <AnimatePresence mode="popLayout">
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {visibleList.map((m) => (
                <GridCard key={m.id} m={m} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {visibleList.map((m) => (
                <ListCard key={m.id} m={m} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {modules.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600">No modules match your filters.</p>
          </div>
        )}

        {canLoadMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisible((v) => v + 6)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:opacity-90"
            >
              Load more
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
