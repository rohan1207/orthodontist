import React, { useState, useEffect } from "react";
import { buildApiUrl } from "../utils/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Fetch from backend instead of using local JSON data

const RecommendedCard = ({ article }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-full min-h-[400px] cursor-pointer"
      style={{ perspective: "2000px" }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full h-full transform-gpu"
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.23, 1, 0.32, 1],
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div
          className="absolute w-full h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-[#006D5B]/10 transition-shadow duration-300 hover:shadow-xl flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
            willChange: "transform",
            WebkitFontSmoothing: "subpixel-antialiased",
            fontSmoothing: "antialiased",
          }}
        >
          <div className="relative h-48 flex-shrink-0">
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/article1.jpg'; // Fallback image
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[#006D5B]/80 via-[#006D5B]/20 to-transparent">
              <span className="inline-block px-2 py-1 rounded-full bg-white/90 text-[#006D5B] text-xs font-medium backdrop-blur-sm border border-[#006D5B]/10">
                {article.category}
              </span>
            </div>
          </div>
          <div
            className="p-4 flex flex-col flex-grow"
            style={{
              backfaceVisibility: "visible",
              transform: "translate3d(0,0,0)",
              willChange: "transform",
              WebkitFontSmoothing: "subpixel-antialiased",
              textRendering: "optimizeLegibility",
            }}
          >
            <h3 className="text-sm sm:text-base font-medium text-[#006D5B] leading-tight mb-2">
              {article.title}
            </h3>
            <p className="text-xs text-[#4B4B4B]/80 flex items-center gap-1.5 mt-auto">
              <svg
                className="w-3 h-3 text-[#006D5B]/60 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="line-clamp-1">{article.readTime}</span>
            </p>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-[#DCE6D5]/40 to-white rounded-2xl p-4 sm:p-5 flex flex-col shadow-lg border border-[#006D5B]/10"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(0)",
            willChange: "transform",
            WebkitFontSmoothing: "subpixel-antialiased",
            fontSmoothing: "antialiased",
          }}
        >
          <div
            className="flex-1 overflow-hidden flex flex-col"
            style={{
              backfaceVisibility: "visible",
              transform: "translate3d(0,0,0)",
              willChange: "transform",
              WebkitFontSmoothing: "subpixel-antialiased",
              textRendering: "optimizeLegibility",
            }}
          >
            <div className="flex-shrink-0">
              <span className="inline-block px-2 py-1 rounded-full bg-white text-[#006D5B] text-xs font-medium border border-[#006D5B]/10 shadow-sm">
                {article.category}
              </span>
              <h3 className="mt-2 text-sm sm:text-base font-medium text-[#006D5B] line-clamp-2">
                {article.title}
              </h3>
              <div className="w-8 h-0.5 bg-[#006D5B]/20 my-2"></div>
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="text-xs text-[#4B4B4B] line-clamp-5 sm:line-clamp-6 leading-relaxed">
                {article.description}
              </p>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 pt-3 border-t border-[#006D5B]/10">
            <Link
              to={`/article/${article.id}`}
              className="group relative inline-flex items-center justify-center w-full py-2 px-4 rounded-lg bg-[#006D5B] text-white text-sm font-medium transition-all duration-300 hover:bg-[#004B3F] hover:shadow-md"
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5 text-xs sm:text-sm">
                Read Article
                <svg
                  className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchTop() {
      setLoading(true);
      setError(null);
      try {
  const res = await fetch(buildApiUrl('/api/blogs?limit=4'));
        if (!res.ok) throw new Error(`fetch failed ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          // The API returns a paginated response, so we need to access the 'blogs' array
          const mapped = (data.blogs || []).map((b, idx) => ({
            id: b.slug || idx + 1,
            title: b.mainHeading || b.title || "Untitled",
            description:
              (b.summaryPoints && b.summaryPoints[0]) || b.subHeading || "",
            // prefer heroImage so listing thumbnails match the article hero image
            image:
              b.heroImage || (b.gallery && b.gallery[0]) || "/article1.jpg",
            category: b.category || "Article",
            readTime: `${b.readingTime || 5} min read`,
          }));
          setArticles(mapped);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchTop();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-10 md:py-24 bg-[#DCE6D5]/30">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Featured Content
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-medium text-[#006D5B] mb-2 sm:mb-4">
            Research Recap
          </h2>
          <p className="text-[#4B4B4B] max-w-2xl mx-auto text-xs sm:text-base md:text-lg px-2">
          Discover evidence-based content, breakthrough technologies, and clinical tips
that keep you informed and enhance your daily practice. This space is your gateway to
staying current with everything new in the world of orthodontics.
          </p>
        </div>

        {loading ? (
          <div className="grid place-items-center py-20">
            <div className="loader">Loading...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-10">
            Error loading articles: {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 lg:gap-10">
              {articles.map((article) => (
                <RecommendedCard key={article.id} article={article} />
              ))}
            </div>

            <div className="mt-10 sm:mt-16 text-center">
              <Link
                to="/articles"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-[#006D5B] hover:text-[#004B3F] font-medium transition-all duration-300 rounded-full border-2 border-[#006D5B]/10 hover:border-[#006D5B]/20 bg-white/50 hover:bg-white/80 hover:shadow-md"
              >
                View All Articles
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
