import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const recommendedArticles = [
  {
    id: 1,
    title: "Understanding Dental Anatomy",
    description:
      "A comprehensive guide to dental structures, terminology, and basic concepts essential for dental students.",
    image: "/article1.jpg",
    category: "Fundamentals",
    readTime: "12 min read",
  },
  {
    id: 2,
    title: "Clinical Case Studies in Orthodontics",
    description:
      "Real-world orthodontic cases with detailed analysis and treatment approaches. Perfect for practical learning.",
    image: "/article2.jpg",
    category: "Clinical Practice",
    readTime: "15 min read",
  },
  {
    id: 3,
    title: "Exam Preparation Strategies",
    description:
      "Expert tips and structured approaches to ace your dental exams with confidence and precision.",
    image: "/article3.jpg",
    category: "Study Tips",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Latest Orthodontic Technologies",
    description:
      "Exploring cutting-edge technologies and innovations shaping the future of orthodontic practice.",
    image: "/article4.jpg",
    category: "Technology",
    readTime: "8 min read",
  },
];

const RecommendedCard = ({ article }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full aspect-[3/4] sm:aspect-[4/5] cursor-pointer"
      style={{ perspective: "1000px" }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transform-gpu"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div
          className="absolute w-full h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
          style={{ backfaceVisibility: "hidden" }}
        >
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
          <div className="p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2">
              {article.title}
            </h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
              {article.readTime}
            </p>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute w-full h-full bg-white rounded-2xl p-4 sm:p-6 flex flex-col shadow-sm border border-gray-100"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex-1">
            <span className="inline-block px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">
              {article.category}
            </span>
            <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-900">
              {article.title}
            </h3>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 line-clamp-3 sm:line-clamp-4">
              {article.description}
            </p>
          </div>
          <div className="mt-3 sm:mt-4">
            <Link
              to={`/article/${article.id}`}
              className="inline-block w-full py-2.5 sm:py-3 text-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Read Article
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Recommended() {
  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Top Recommended Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Curated content to enhance your dental knowledge and academic
            success. Discover our most impactful articles.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {recommendedArticles.map((article) => (
            <RecommendedCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            View All Articles
            <svg
              className="w-4 h-4"
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
      </div>
    </section>
  );
}
