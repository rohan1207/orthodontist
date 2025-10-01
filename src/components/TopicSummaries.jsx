import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  BookOpenIcon,
  DocumentTextIcon,
  LightBulbIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowRightIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const TopicCard = ({ topic, isFetched }) => {
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
                    background: `linear-gradient(to right, ${
            color.split(" ")[1]
          }, ${color.split(" ")[3]})`,
          filter: "blur(8px)",
          zIndex: 0,
        }}
      />

      <div className="relative bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-[#006D5B]/10 h-full flex flex-col">
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="p-2 sm:p-3 md:p-4 rounded-xl bg-[#006D5B] shadow-lg">
                <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-[#006D5B] mb-1 line-clamp-2 leading-snug h-[2.8em] overflow-hidden" title={topic.title}>
                  {topic.title}
                </h3>
                <div className="flex items-center gap-1 sm:gap-2">
                  <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#006D5B]/70" />
                </div>
              </div>
            </div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex-shrink-0 p-2 rounded-full bg-[#DCE6D5]/50 text-[#006D5B] hover:bg-[#DCE6D5]/70 transition-colors duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/summaries/${topic._id}`);
              }}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Teaser + Highlights to encourage click-through */}
          <div className="mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-[#4B4B4B] leading-relaxed line-clamp-3 h-[4.5em] overflow-hidden">
              {isFetched ? topic.description : topic.teaser}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
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
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const useCounter = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime;
          const numericEnd = parseInt(end);
          const startValue = 0;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsedTime / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(
              startValue + (numericEnd - startValue) * easeOutQuart
            );

            setCount(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [end, duration]);

  return [count, nodeRef];
};

const StatBox = ({ icon: Icon, value, label }) => {
  const numericValue = parseInt(value);
  const suffix = value.replace(numericValue.toString(), "");
  const [count, ref] = useCounter(numericValue);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      className="bg-white p-3 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-[#006D5B]/10 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-center mb-3">
        <div className="p-2 sm:p-3 rounded-xl bg-[#DCE6D5]/50">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#006D5B]" />
        </div>
      </div>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-[#006D5B] mb-0.5 sm:mb-1"
        >
          {count}
          {suffix}
        </motion.div>
        <div className="text-sm text-[#4B4B4B]">{label}</div>
      </div>
    </motion.div>
  );
};

export default function TopicSummaries() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/topicsummaries`);
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topic summaries:', error);
      }
      setLoading(false);
    };

    fetchTopics();
  }, []);

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-[#DCE6D5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-sm font-medium mb-4 border border-[#006D5B]/10"
          >
            <DocumentDuplicateIcon className="w-5 h-5" />
            Concept Capsules
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#006D5B] mb-3 sm:mb-4 md:mb-6"
          >
            Master Complex Topics with Ease
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm sm:text-base md:text-xl text-[#4B4B4B] max-w-3xl mx-auto px-2 sm:px-0"
          >
            Comprehensive summaries curated from multiple textbooks, designed
            for quick understanding and effective revision.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16">
          <StatBox icon={DocumentTextIcon} value="50+" label="Topics Covered" />
          <StatBox icon={BookOpenIcon} value="15+" label="Textbook Sources" />
          <StatBox icon={ClockIcon} value="2-3x" label="Faster Learning" />
          <StatBox icon={AcademicCapIcon} value="92%" label="Student Success" />
        </div>

        {/* Topics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16">
          {loading ? (
            <p>Loading topics...</p>
          ) : (
            topics.map((topic) => (
              <TopicCard key={topic._id} topic={topic} isFetched={true} />
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="w-full flex justify-center mb-12">
          <Link
            to="/summaries"
            className="group relative flex items-center justify-center bg-[#006D5B] text-white font-semibold border border-[#006D5B]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-visible"
            style={{
              width: "300px",
              height: "75px",
              borderRadius: "50px",
              textDecoration: "none",
            }}
          >
            {/* Tooth peeks from top center on hover/click */}
            <div className="pointer-events-none absolute left-1/2 top-0 z-[3] -translate-x-1/2 -translate-y-2 opacity-0 scale-90 transition-all duration-300 ease-out group-hover:-translate-y-8 group-hover:opacity-100 group-hover:scale-100 group-active:translate-y-10 text-xl">
              <img
                src="/tooth_peak.png"
                alt=""
                className="w-16 h-16 drop-shadow-lg"
              />
            </div>
            <span className="relative z-[2] text-lg">Explore All Topics</span>
          </Link>
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center bg-[#006D5B] text-white py-12 md:py-16 px-4 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help Understanding a Topic?
          </h3>
          <p className="text-base md:text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Our expert educators are here to help you master any dental topic.
            Get personalized guidance and support.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-[#006D5B] bg-white rounded-xl font-semibold hover:bg-[#DCE6D5] transition-all duration-300"
          >
            Get Expert Help
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
