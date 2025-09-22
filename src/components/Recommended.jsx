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
      style={{ perspective: "2000px" }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full h-full transform-gpu"
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          z: isFlipped ? 50 : 0
        }}
        transition={{ 
          duration: 0.7, 
          ease: [0.23, 1, 0.32, 1],
          z: { duration: 0.3 }
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div
          className="absolute w-full h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-[#006D5B]/10 transition-shadow duration-300 hover:shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-2/3">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#006D5B]/80 via-[#006D5B]/20 to-transparent">
              <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[#006D5B] text-xs font-medium backdrop-blur-sm border border-[#006D5B]/10">
                {article.category}
              </span>
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-medium text-[#006D5B] line-clamp-2 leading-snug">
              {article.title}
            </h3>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#4B4B4B]/80 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#006D5B]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime}
            </p>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-[#DCE6D5]/40 to-white rounded-2xl p-5 sm:p-6 flex flex-col shadow-lg border border-[#006D5B]/10"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex-1">
            <span className="inline-block px-3 py-1 rounded-full bg-white text-[#006D5B] text-xs font-medium border border-[#006D5B]/10 shadow-sm">
              {article.category}
            </span>
            <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-[#006D5B]">
              {article.title}
            </h3>
            <div className="w-12 h-0.5 bg-[#006D5B]/20 my-3"></div>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-[#4B4B4B] line-clamp-3 sm:line-clamp-4 leading-relaxed">
              {article.description}
            </p>
          </div>
          <div className="mt-4 sm:mt-5">
            <Link
              to={`/article/${article.id}`}
              className="group relative inline-block w-full py-3 sm:py-3.5 text-center rounded-xl bg-[#006D5B] text-white text-sm font-medium transition-all duration-300 hover:bg-[#004B3F] hover:shadow-lg hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Read Article
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Recommended() {
  return (
    <section className="py-16 md:py-24 bg-[#DCE6D5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-sm font-medium mb-4">
            Featured Content
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-[#006D5B] mb-4">
            Top Recommended Articles
          </h2>
          <p className="text-[#4B4B4B] max-w-2xl mx-auto text-base md:text-lg">
            Curated content to enhance your dental knowledge and academic
            success. Discover our most impactful articles.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {recommendedArticles.map((article) => (
            <RecommendedCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 text-[#006D5B] hover:text-[#004B3F] font-medium transition-all duration-300 rounded-full border-2 border-[#006D5B]/10 hover:border-[#006D5B]/20 bg-white/50 hover:bg-white/80 hover:shadow-md"
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
      </div>
    </section>
  );
}
