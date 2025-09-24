import React, { useMemo, useState, useEffect } from "react";
import { buildApiUrl } from "../utils/api";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  Bars3BottomLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
// We'll fetch articles from the backend and map to the shape the page expects.
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
          loading="lazy"
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
  // default: no sort applied until user chooses
  const [sortBy, setSortBy] = useState("none");
  const [visible, setVisible] = useState(8);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      try {
  const res = await fetch(buildApiUrl('/api/blogs?limit=100'));
        if (!res.ok) throw new Error(`fetch failed ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          const mapped = data.map((b, idx) => ({
            id: b.slug || idx + 1,
            title: b.mainHeading || b.title || "Untitled",
            description:
              (b.summaryPoints && b.summaryPoints[0]) || b.subHeading || "",
            // prefer heroImage so listing thumbnails match the article hero image
            image:
              b.heroImage || (b.gallery && b.gallery[0]) || "/article1.jpg",
            category: b.category || "Article",
            readTimeMin: b.readingTime || 5,
            date: b.scheduledAt
              ? new Date(b.scheduledAt).toISOString().slice(0, 10)
              : new Date().toISOString().slice(0, 10),
          }));
          setArticles(mapped);
          // Show all fetched articles by default
          setVisible(mapped.length);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchArticles();
    return () => {
      cancelled = true;
    };
  }, []);

  const CATEGORIES = [
    "All",
    ...Array.from(new Set(articles.map((a) => a.category))),
  ];

  const filtered = useMemo(() => {
    let list = [...articles];

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

    // Apply sorting only if user selected it
    if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return list;
  }, [query, category, sortBy, articles]);

  const visibleList = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  // When the filtered results change (e.g. articles loaded or filters applied),
  // show all filtered results by default (no implicit pagination unless user loads more).
  useEffect(() => {
    setVisible(filtered.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length]);

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
            {loading ? (
              "Loading articles..."
            ) : error ? (
              <span className="text-red-600">Error: {error}</span>
            ) : (
              <>
                Found{" "}
                <span className="text-[#006D5B] font-semibold">
                  {filtered.length}
                </span>{" "}
                articles
              </>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#006D5B]/20 text-[#4B4B4B] focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20"
          >
            <option value="none">Default</option>
            <option value="newest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="text-center py-20">Loading articles...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-20">
              Error loading articles: {error}
            </div>
          ) : (
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
          )}
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
