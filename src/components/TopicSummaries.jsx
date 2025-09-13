import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  DocumentTextIcon, 
  LightBulbIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowRightIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const sampleTopics = [
  {
    id: 1,
    title: "Growth and Development",
    sources: ["Contemporary Orthodontics", "Graber's Orthodontics", "Proffit's Orthodontics"],
    keyPoints: 12,
    readTime: "15 mins",
    difficulty: "Medium",
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
    sources: ["Orthodontic Materials", "Clinical Orthodontics", "Biomechanics in Clinical Practice"],
    keyPoints: 15,
    readTime: "20 mins",
    difficulty: "Advanced",
    icon: ChartBarIcon,
    color: "from-green-500 to-emerald-600",
    preview: [
      "Force Systems",
      "Center of Resistance",
      "Moment to Force Ratio",
    ],
  },
  {
    id: 3,
    title: "Diagnosis and Treatment Planning",
    sources: ["Essential Orthodontics", "Clinical Diagnosis", "Treatment Strategies"],
    keyPoints: 18,
    readTime: "25 mins",
    difficulty: "Intermediate",
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
    sources: ["Orthodontic Appliances", "Contemporary Orthodontics", "Appliance Design"],
    keyPoints: 10,
    readTime: "18 mins",
    difficulty: "Intermediate",
    icon: DocumentDuplicateIcon,
    color: "from-green-500 to-emerald-600",
    preview: [
      "Fixed Appliances",
      "Removable Appliances",
      "Functional Appliances",
    ],  
  }
];

const TopicCard = ({ topic, isExpanded, onToggle }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onToggle}
      className="relative cursor-pointer group"
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ 
             background: `linear-gradient(to right, ${topic.color.split(' ')[1]}, ${topic.color.split(' ')[3]})`,
             filter: 'blur(8px)',
             zIndex: 0 
           }} 
      />
      
      <div className="relative bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${topic.color}`}>
              <topic.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{topic.title}</h3>
              <p className="text-sm text-gray-500">{topic.sources.length} textbook sources</p>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: isExpanded ? 90 : 0 }}
            className="text-gray-400 hover:text-gray-600"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Key Points</div>
            <div className="font-semibold text-gray-700">{topic.keyPoints}</div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-sm text-gray-500">Read Time</div>
            <div className="font-semibold text-gray-700">{topic.readTime}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Difficulty</div>
            <div className="font-semibold text-gray-700">{topic.difficulty}</div>
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
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Topics Covered:</h4>
                  <ul className="space-y-2">
                    {topic.preview.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-2 text-gray-600"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Source Textbooks:</h4>
                  <div className="space-y-2">
                    {topic.sources.map((source, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-2 text-gray-600"
                      >
                        <BookOpenIcon className="w-5 h-5 text-blue-500" />
                        <span>{source}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/summaries/${topic.id}`}
                  className={`mt-4 w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-white bg-gradient-to-r ${topic.color} hover:opacity-90 transition-opacity duration-200`}
                >
                  Read Full Summary
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </motion.div>
  );
};

const StatBox = ({ icon: Icon, value, label }) => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    className="bg-white p-6 rounded-2xl shadow-lg"
  >
    <div className="flex items-center justify-center mb-2">
      <Icon className="w-8 h-8 text-green-500" />
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  </motion.div>
);

export default function TopicSummaries() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-4"
          >
            <DocumentDuplicateIcon className="w-5 h-5" />
            Topic Summaries
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Master Complex Topics with Ease
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Comprehensive summaries curated from multiple textbooks, designed for quick understanding and effective revision.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatBox icon={DocumentTextIcon} value="50+" label="Topics Covered" />
          <StatBox icon={BookOpenIcon} value="15+" label="Textbook Sources" />
          <StatBox icon={ClockIcon} value="2-3x" label="Faster Learning" />
          <StatBox icon={AcademicCapIcon} value="92%" label="Student Success" />
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {sampleTopics.map((topic) => (
            <motion.div
              key={topic.id}
              animate={{
                opacity: expandedId === null || expandedId === topic.id ? 1 : 0.3,
                scale: expandedId === topic.id ? 1 : expandedId === null ? 1 : 0.98,
              }}
              transition={{ duration: 0.3 }}
              className={expandedId !== null && expandedId !== topic.id ? "pointer-events-none" : ""}
            >
              <TopicCard
                topic={topic}
                isExpanded={expandedId === topic.id}
                onToggle={() => setExpandedId(expandedId === topic.id ? null : topic.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link
            to="/topic-summaries"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity duration-200"
          >
            Explore All Topic Summaries
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
