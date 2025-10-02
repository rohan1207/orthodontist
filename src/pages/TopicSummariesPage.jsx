import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import {
  BookOpenIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

// Removed static TOPICS array as we'll fetch from backend

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];
const SORTS = [
  { id: "title-asc", label: "Title A → Z" },
  { id: "title-desc", label: "Title Z → A" },
  { id: "date-desc", label: "Newest First" },
  { id: "date-asc", label: "Oldest First" },
];

function TopicCard({ topic, isFetched = true }) {
  const color = topic.color || "from-green-500 to-emerald-600";
  const navigate = useNavigate();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="relative group w-full"
    >
      <div
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, ${color.split(" ")[1]}, ${color.split(" ")[3]})`,
          filter: "blur(8px)",
          zIndex: 0,
        }}
      />

      <motion.div
        whileTap={{ scale: 0.96 }}
        className="relative bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-[#006D5B]/10 h-full flex flex-col"
        onClick={() => navigate(`/summaries/${topic._id || topic.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/summaries/${topic._id || topic.id}`); }}
      >
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="p-2 sm:p-3 rounded-xl bg-[#006D5B] shadow-lg">
                <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-[#006D5B] mb-1 line-clamp-2 leading-snug" title={topic.title}>
                  {topic.title}
                </h3>
                <div className="flex items-center gap-1 sm:gap-2">
                  <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#006D5B]/70" />
                </div>
              </div>
            </div>
            {/* (arrow removed; whole card is clickable) */}
          </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-[#4B4B4B] leading-relaxed line-clamp-3">
              {isFetched ? topic.description : topic.teaser}
            </p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {(isFetched ? topic.tags : topic.highlights)?.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-[#DCE6D5]/60 text-[#006D5B] border border-[#006D5B]/10 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]"
                    title={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="px-3 py-1 text-xs font-medium rounded-full bg-[#006D5B] text-white border border-[#006D5B]/10 hover:bg-[#DCE6D5]/80 hover:text-[#006D5B] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/summaries/${topic._id || topic.id}`);
                }}
              >
                Read
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
  );
}

export default function TopicSummariesPage() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("title-asc");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/topicsummaries`);
        setTopics(response.data);
      } catch (err) {
        console.error('Error fetching topic summaries:', err);
        setError('Failed to load topic summaries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const filteredTopics = useMemo(() => {
    let list = [...topics];

    if (difficulty !== "All") {
      list = list.filter((t) => t.difficulty === difficulty);
    }

    const searchTerms = query.trim().toLowerCase().split(/\s+/);
    if (searchTerms[0]) {
      list = list.filter((topic) => {
        const content = `${topic.title} ${topic.description || ''} ${topic.tags?.join(' ') || ''}`.toLowerCase();
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
      case "date-desc":
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "date-asc":
        list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }
    return list;
  }, [topics, query, difficulty, sortBy]);

  const resetFilters = () => {
    setQuery("");
    setDifficulty("All");
    setSortBy("title-asc");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006D5B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-[#4B4B4B] mb-2">Something went wrong</h2>
          <p className="text-[#4B4B4B]/70 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#006D5B] text-white rounded-lg hover:bg-[#005c4d] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 bg-[#DCE6D5]/30 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#006D5B] mb-6 flex items-center justify-center gap-3"
          >
            <DocumentDuplicateIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" /> Concept Capsules
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl"
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
            <MagnifyingGlassIcon className="w-5 sm:w-6 h-5 sm:h-6 text-[#006D5B] absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl border border-[#006D5B]/20 bg-white text-sm sm:text-base text-[#4B4B4B] placeholder-[#4B4B4B]/60 focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20 shadow-sm"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTopics.map((topic) => (
              <TopicCard key={topic._id} topic={topic} isFetched={true} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
