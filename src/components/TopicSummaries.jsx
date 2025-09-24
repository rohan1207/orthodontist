import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  DocumentTextIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowRightIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const sampleTopics = [
  {
    id: 1,
    title: "Growth and Development",
    sources: [
      "Contemporary Orthodontics",
      "Graber's Orthodontics",
      "Proffit's Orthodontics",
    ],
    teaser:
      "Chapter-wise, high-yield summary covering prenatal/postnatal growth, factors, and major growth theories—simplified for quick recall.",
    highlights: ["High-yield", "Concept-first", "Exam-focused"],
    icon: LightBulbIcon,
    color: "from-green-500 to-emerald-600",
    preview: [
      "Pre and Post Natal Development",
      "Factors affecting Growth",
      "Growth Theories",
    ],
  },
  {
    id: 2,
    title: "Biomechanics in Orthodontics",
    sources: [
      "Orthodontic Materials",
      "Clinical Orthodontics",
      "Biomechanics in Clinical Practice",
    ],
    teaser:
      "Force systems, centers of resistance, and M/F ratio explained with simple visuals and step-by-step intuition.",
    highlights: ["Visual aids", "Step-by-step", "Tricky concepts made easy"],
    icon: ChartBarIcon,
    color: "from-green-500 to-emerald-600",
    preview: ["Force Systems", "Center of Resistance", "Moment to Force Ratio"],
  },
  {
    id: 3,
    title: "Diagnosis and Treatment Planning",
    sources: [
      "Essential Orthodontics",
      "Clinical Diagnosis",
      "Treatment Strategies",
    ],
    teaser:
      "From clinical exam to radiographs and objectives—distilled, organized notes that tell you exactly what to look for.",
    highlights: ["Structured flow", "Checklists", "Decision cues"],
    icon: DocumentTextIcon,
    color: "from-green-500 to-emerald-600",
    preview: [
      "Clinical Examination",
      "Radiographic Analysis",
      "Treatment Objectives",
    ],
  },
  {
    id: 4,
    title: "Orthodontic Appliances",
    sources: [
      "Orthodontic Appliances",
      "Contemporary Orthodontics",
      "Appliance Design",
    ],
    teaser:
      "Fixed, removable, and functional appliances—what they are, when to use, and how to remember them fast.",
    highlights: ["Mnemonics", "When-to-use", "Compare & contrast"],
    icon: DocumentDuplicateIcon,
    color: "from-green-500 to-emerald-600",
    preview: [
      "Fixed Appliances",
      "Removable Appliances",
      "Functional Appliances",
    ],
  },
];

const TopicCard = ({ topic, isExpanded, onToggle }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      onClick={onToggle}
      className="relative cursor-pointer group w-full"
    >
      <div
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, ${
            topic.color.split(" ")[1]
          }, ${topic.color.split(" ")[3]})`,
          filter: "blur(8px)",
          zIndex: 0,
        }}
      />

      <div className="relative bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-[#006D5B]/10">
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="p-2 sm:p-3 md:p-4 rounded-xl bg-[#006D5B] shadow-lg">
              <topic.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-[#006D5B] mb-1">
                {topic.title}
              </h3>
              <div className="flex items-center gap-1 sm:gap-2">
                <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#006D5B]/70" />
                <p className="text-xs sm:text-sm text-[#4B4B4B]">
                  {topic.sources.length} textbook sources
                </p>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            className="p-2 rounded-full bg-[#DCE6D5]/50 text-[#006D5B] hover:bg-[#DCE6D5]/70 transition-colors duration-200"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Teaser + Highlights to encourage click-through */}
        <div className="mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-[#4B4B4B] leading-relaxed line-clamp-2">
            {topic.teaser}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {topic.highlights?.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium rounded-full bg-[#DCE6D5]/60 text-[#006D5B] border border-[#006D5B]/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="space-y-6">
                <div className="border-t border-[#006D5B]/10 pt-6">
                  <h4 className="font-semibold text-[#006D5B] mb-4 text-lg">
                    Key Topics Covered:
                  </h4>
                  <ul className="space-y-3 bg-[#DCE6D5]/20 p-4 rounded-xl">
                    {topic.preview.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 text-[#4B4B4B]"
                      >
                        <div className="p-1 rounded-full bg-[#006D5B]/10">
                          <CheckCircleIcon className="w-5 h-5 text-[#006D5B]" />
                        </div>
                        <span className="text-base">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#006D5B]/10 pt-6">
                  <h4 className="font-semibold text-[#006D5B] mb-4 text-lg">
                    Source Textbooks:
                  </h4>
                  <div className="space-y-3 bg-[#DCE6D5]/20 p-4 rounded-xl">
                    {topic.sources.map((source, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-3 text-[#4B4B4B]"
                      >
                        <div className="p-1 rounded-full bg-[#006D5B]/10">
                          <BookOpenIcon className="w-5 h-5 text-[#006D5B]" />
                        </div>
                        <span className="text-base">{source}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/summaries/${topic.id}`}
                  className="mt-6 w-full inline-flex items-center justify-center px-6 py-4 rounded-xl text-white bg-[#006D5B] hover:bg-[#006D5B]/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Read Full Summary
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-[#DCE6D5]/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-sm font-medium mb-4 border border-[#006D5B]/10"
          >
            <DocumentDuplicateIcon className="w-5 h-5" />
            Topic Summaries
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
          {sampleTopics.map((topic) => (
            <motion.div
              key={topic.id}
              animate={{
                opacity:
                  expandedId === null || expandedId === topic.id ? 1 : 0.3,
                scale:
                  expandedId === topic.id ? 1 : expandedId === null ? 1 : 0.98,
              }}
              transition={{ duration: 0.3 }}
              className={
                expandedId !== null && expandedId !== topic.id
                  ? "pointer-events-none"
                  : ""
              }
            >
              <TopicCard
                topic={topic}
                isExpanded={expandedId === topic.id}
                onToggle={() =>
                  setExpandedId(expandedId === topic.id ? null : topic.id)
                }
              />
            </motion.div>
          ))}
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
