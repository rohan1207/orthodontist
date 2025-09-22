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
// Helper function to format dates
function formatDate(dateString) {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Article Card Component
function ArticleCard({ article }) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#006D5B]/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-[16/10] relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1.5 rounded-lg bg-[#006D5B] text-white text-sm font-medium">
            {article.category}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white/90 text-[#4B4B4B] text-sm">
            {article.readTimeMin} min read
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="text-sm text-[#4B4B4B]/70 mb-2">
          {formatDate(article.date)}
        </div>
        <h3 className="text-xl font-semibold text-[#006D5B] line-clamp-2 mb-3 min-h-[3.5rem]">
          {article.title}
        </h3>
        <p className="text-[#4B4B4B] line-clamp-2 mb-4 min-h-[3rem]">
          {article.description}
        </p>
        <Link
          to={`/article/${article.id}`}
          className="inline-flex items-center gap-2 text-[#006D5B] font-medium hover:text-[#006D5B]/80 transition-colors group"
        >
          Read Article
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ArticlesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [visible, setVisible] = useState(8);

  const filtered = useMemo(() => {
    let list = [...ALL_ARTICLES];

    // Apply category filter
    if (category !== "All") {
      list = list.filter((a) => a.category === category);
    }

    // Apply search filter
    const searchTerms = query.trim().toLowerCase().split(/\s+/);
    if (searchTerms[0]) {
      list = list.filter((article) => {
        const content =
          `${article.title} ${article.description} ${article.category}`.toLowerCase();
        return searchTerms.every((term) => content.includes(term));
      });
    }

    // Apply sorting
    list.sort((a, b) =>
      sortBy === "oldest"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    return list;
  }, [query, category, sortBy]);

  const visibleList = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  return (
    <div className="py-16 md:py-24 bg-[#DCE6D5]/30 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#006D5B] mb-6"
          >
            Explore Articles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-[#4B4B4B] mb-8"
          >
            Discover in-depth articles on orthodontics, from fundamentals to
            advanced clinical practices.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-[#006D5B] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles by topic, keyword, or category..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#006D5B]/20 bg-white text-[#4B4B4B] placeholder-[#4B4B4B]/60 focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20 shadow-sm"
            />
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                category === c
                  ? "bg-[#006D5B] text-white shadow-md"
                  : "bg-white text-[#4B4B4B] border border-[#006D5B]/10 hover:border-[#006D5B]/30"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Results Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-[#4B4B4B]">
            Found{" "}
            <span className="text-[#006D5B] font-semibold">
              {filtered.length}
            </span>{" "}
            articles
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#006D5B]/20 text-[#4B4B4B] focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20"
          >
            <option value="newest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {visibleList.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <img
              src="/article1.jpg"
              alt="No results"
              className="w-48 h-48 mx-auto mb-6 rounded-full object-cover opacity-50"
            />
            <h3 className="text-xl font-semibold text-[#006D5B] mb-2">
              No Articles Found
            </h3>
            <p className="text-[#4B4B4B]">
              Try adjusting your search or category to find what you're looking
              for.
            </p>
          </motion.div>
        )}

        {/* Load more */}
        {canLoadMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setVisible((v) => v + 6)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#006D5B] text-white font-medium hover:bg-[#006D5B]/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Load More Articles
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
