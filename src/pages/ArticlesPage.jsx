import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  Bars3BottomLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

// Sample data (can be replaced with API later)
const ALL_ARTICLES = [
  {
    id: 1,
    title: "Understanding Dental Anatomy",
    description:
      "A comprehensive guide to dental structures, terminology, and basic concepts essential for dental students.",
    image: "/article1.jpg",
    category: "Fundamentals",
    readTimeMin: 12,
    date: "2025-07-01",
  },
  {
    id: 2,
    title: "Clinical Case Studies in Orthodontics",
    description:
      "Real-world orthodontic cases with detailed analysis and treatment approaches. Perfect for practical learning.",
    image: "/article2.jpg",
    category: "Clinical Practice",
    readTimeMin: 15,
    date: "2025-06-20",
  },
  {
    id: 3,
    title: "Exam Preparation Strategies",
    description:
      "Expert tips and structured approaches to ace your dental exams with confidence and precision.",
    image: "/article3.jpg",
    category: "Study Tips",
    readTimeMin: 10,
    date: "2025-06-05",
  },
  {
    id: 4,
    title: "Latest Orthodontic Technologies",
    description:
      "Exploring cutting-edge technologies and innovations shaping the future of orthodontic practice.",
    image: "/article4.jpg",
    category: "Technology",
    readTimeMin: 8,
    date: "2025-05-28",
  },
  // Extras for the page
  {
    id: 5,
    title: "Cephalometrics Made Simple",
    description:
      "A friendly walkthrough of cephalometric landmarks and interpretation for beginners.",
    image: "/article1.jpg",
    category: "Fundamentals",
    readTimeMin: 9,
    date: "2025-05-15",
  },
  {
    id: 6,
    title: "Managing Class II Malocclusion",
    description:
      "Decision pathways and appliances selection based on growth potential and patient profile.",
    image: "/article2.jpg",
    category: "Clinical Practice",
    readTimeMin: 14,
    date: "2025-05-01",
  },
  {
    id: 7,
    title: "High-Yield Topics Before Exams",
    description:
      "Last-week checklist covering high-yield topics and common pitfalls to avoid.",
    image: "/article3.jpg",
    category: "Study Tips",
    readTimeMin: 7,
    date: "2025-04-22",
  },
  {
    id: 8,
    title: "Digital Workflow in Orthodontics",
    description:
      "From intraoral scanning to aligner planning—building a modern digital workflow.",
    image: "/article4.jpg",
    category: "Technology",
    readTimeMin: 11,
    date: "2025-04-10",
  },
];

const CATEGORIES = [
  "All",
  "Fundamentals",
  "Clinical Practice",
  "Study Tips",
  "Technology",
];
const SORT_OPTIONS = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "time-asc", label: "Read time • Low to High" },
  { id: "time-desc", label: "Read time • High to Low" },
];

// Grid Card (matches the look from Recommended.jsx)
function GridCard({ article }) {
  return (
    <motion.div
      className="relative w-full aspect-[4/5]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute w-full h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="relative h-2/3">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <span className="inline-block px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {article.readTimeMin} min read
          </p>
          <div className="mt-4">
            <Link
              to={`/article/${article.id}`}
              className="inline-block w-full py-3 text-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Read Article
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// List Card
function ListCard({ article }) {
  return (
    <motion.div
      className="w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
        <div className="relative h-44 md:h-full">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span>{new Date(article.date).toLocaleDateString()}</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span>{article.readTimeMin} min read</span>
          </div>
          <h3 className="mt-2 text-lg md:text-xl font-semibold text-gray-900">
            {article.title}
          </h3>
          <p className="mt-2 text-sm md:text-base text-gray-600 line-clamp-2 md:line-clamp-3">
            {article.description}
          </p>
          <div className="mt-4">
            <Link
              to={`/article/${article.id}`}
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              Read Article
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ArticlesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState("grid"); // 'grid' | 'list'
  const [visible, setVisible] = useState(8);

  const filtered = useMemo(() => {
    let list = [...ALL_ARTICLES];

    // Category filter
    if (category !== "All") {
      list = list.filter((a) => a.category === category);
    }

    // Search filter (title + description)
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        list.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "time-asc":
        list.sort((a, b) => a.readTimeMin - b.readTimeMin);
        break;
      case "time-desc":
        list.sort((a, b) => b.readTimeMin - a.readTimeMin);
        break;
      default:
        break;
    }

    return list;
  }, [query, category, sortBy]);

  const visibleList = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  return (
    <div className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-3">
            All Articles
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse all our curated content. Use search, filters, and view
            options to find exactly what you need.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                    category === c
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {c}
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
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
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
                setQuery("");
                setCategory("All");
                setSortBy("newest");
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 text-sm text-gray-500">
          {filtered.length} articles
        </div>

        <AnimatePresence mode="popLayout">
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
              {visibleList.map((article) => (
                <GridCard key={article.id} article={article} />
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
              {visibleList.map((article) => (
                <ListCard key={article.id} article={article} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600">
              No articles match your filters. Try adjusting your search or
              category.
            </p>
          </div>
        )}

        {/* Load more */}
        {canLoadMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisible((v) => v + 8)}
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
