import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AcademicCapIcon,
  ChartBarIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  CheckCircleIcon,
  BookOpenIcon,
  ClockIcon,
  Squares2X2Icon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const TOPICS = [
  {
    id: 1,
    title: "Growth and Development",
    sources: [
      "Contemporary Orthodontics",
      "Graber's Orthodontics",
      "Proffit's Orthodontics",
    ],
    keyPoints: 12,
    readTimeMin: 15,
    difficulty: "Medium",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 2,
    title: "Biomechanics in Orthodontics",
    sources: [
      "Orthodontic Materials",
      "Clinical Orthodontics",
      "Biomechanics in Clinical Practice",
    ],
    keyPoints: 15,
    readTimeMin: 20,
    difficulty: "Advanced",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 3,
    title: "Diagnosis and Treatment Planning",
    sources: [
      "Essential Orthodontics",
      "Clinical Diagnosis",
      "Treatment Strategies",
    ],
    keyPoints: 18,
    readTimeMin: 25,
    difficulty: "Intermediate",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 4,
    title: "Orthodontic Appliances",
    sources: [
      "Orthodontic Appliances",
      "Contemporary Orthodontics",
      "Appliance Design",
    ],
    keyPoints: 10,
    readTimeMin: 18,
    difficulty: "Intermediate",
    color: "from-green-500 to-emerald-600",
  },
];

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Medium", "Advanced"];
const SORTS = [
  { id: "title-asc", label: "Title A → Z" },
  { id: "title-desc", label: "Title Z → A" },
  { id: "read-asc", label: "Read time • Low → High" },
  { id: "read-desc", label: "Read time • High → Low" },
  { id: "points-desc", label: "Key points • High → Low" },
];

function TopicCard({ topic }) {
  const difficultyColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  };

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#006D5B]/10 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-[#006D5B]/10">
            <DocumentTextIcon className="w-6 h-6 text-[#006D5B]" />
          </div>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              difficultyColors[topic.difficulty] || "bg-gray-100 text-gray-800"
            }`}
          >
            {topic.difficulty}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-[#006D5B] line-clamp-2 mb-2 flex-grow min-h-[3.5rem]">
          {topic.title}
        </h3>

        <p className="text-sm text-[#4B4B4B]/70 mb-6 line-clamp-1">
          Sources: {topic.sources.join(", ")}
        </p>

        <div className="grid grid-cols-2 gap-4 text-center border-t border-dashed border-[#006D5B]/10 pt-4">
          <div>
            <div className="text-2xl font-bold text-[#4B4B4B]">
              {topic.keyPoints}
            </div>
            <div className="text-xs text-[#4B4B4B]/70">Key Points</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#4B4B4B]">
              {topic.readTimeMin}
            </div>
            <div className="text-xs text-[#4B4B4B]/70">Mins Read</div>
          </div>
        </div>
      </div>

      <Link
        to={`/summaries/${topic.id}`}
        className="block bg-[#006D5B] text-white text-center font-medium py-4 hover:bg-[#005c4d] transition-colors duration-300"
      >
        View Summary
      </Link>
    </motion.div>
  );
}

export default function TopicSummariesPage() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("title-asc");
  const [visible, setVisible] = useState(12);

  const topics = useMemo(() => {
    let list = [...TOPICS];

    if (difficulty !== "All") {
      list = list.filter((t) => t.difficulty === difficulty);
    }

    const searchTerms = query.trim().toLowerCase().split(/\s+/);
    if (searchTerms[0]) {
      list = list.filter((topic) => {
        const content = `${topic.title} ${topic.sources.join(
          " "
        )}`.toLowerCase();
        return searchTerms.every((term) => content.includes(term));
      });
    }

    switch (sortBy) {
      case "title-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "read-asc":
        list.sort((a, b) => a.readTimeMin - b.readTimeMin);
        break;
      case "read-desc":
        list.sort((a, b) => b.readTimeMin - a.readTimeMin);
        break;
      case "points-desc":
        list.sort((a, b) => b.keyPoints - a.keyPoints);
        break;
      default:
        break;
    }
    return list;
  }, [query, difficulty, sortBy]);

  const visibleList = topics.slice(0, visible);
  const canLoadMore = visible < topics.length;

  const resetFilters = () => {
    setQuery("");
    setDifficulty("All");
    setSortBy("title-asc");
    setVisible(12);
  };

  return (
    <div className="py-16 md:py-24 bg-[#DCE6D5]/30 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#006D5B] mb-6 flex items-center justify-center gap-3"
          >
            <DocumentDuplicateIcon className="w-10 h-10" /> Topic Summaries
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-[#4B4B4B]"
          >
            High-yield summaries of key orthodontic topics, distilled from
            trusted sources to accelerate your learning.
          </motion.p>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="relative max-w-3xl mx-auto mb-6">
            <MagnifyingGlassIcon className="w-6 h-6 text-[#006D5B] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics or sources (e.g., 'growth proffit')..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#006D5B]/20 bg-white text-[#4B4B4B] placeholder-[#4B4B4B]/60 focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20 shadow-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-[#006D5B]/20 bg-white text-[#4B4B4B] focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20 w-full sm:w-auto"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "All Levels" : d}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-[#006D5B]/20 bg-white text-[#4B4B4B] focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20 w-full sm:w-auto"
            >
              {SORTS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>

            <button
              onClick={resetFilters}
              className="px-4 py-2.5 rounded-lg border border-[#006D5B]/20 bg-white text-[#4B4B4B] hover:bg-[#006D5B]/5 transition-colors w-full sm:w-auto"
            >
              Reset
            </button>
          </div>
        </motion.div>

        <div className="mb-8 text-center sm:text-left text-[#4B4B4B]">
          Displaying{" "}
          <span className="font-semibold text-[#006D5B]">{topics.length}</span>{" "}
          summaries
        </div>

        <AnimatePresence>
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {visibleList.map((t) => (
              <TopicCard key={t.id} topic={t} />
            ))}
          </motion.div>
        </AnimatePresence>

        {topics.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <DocumentDuplicateIcon className="w-24 h-24 mx-auto text-[#006D5B]/20 mb-4" />
            <h3 className="text-xl font-semibold text-[#006D5B] mb-2">
              No Summaries Found
            </h3>
            <p className="text-[#4B4B4B] max-w-md mx-auto">
              Your search returned no results. Please try different keywords or
              adjust the filters.
            </p>
          </motion.div>
        )}

        {canLoadMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => setVisible((v) => v + 6)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#006D5B] text-white font-medium hover:bg-[#005c4d] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Load More Summaries
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
