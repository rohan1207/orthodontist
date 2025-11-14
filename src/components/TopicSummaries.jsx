import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BookOpenIcon,
  DocumentTextIcon,
  LightBulbIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

// API Configuration
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TOPICS_ENDPOINT = `${API_BASE}/api/topicsummaries`;

// Icon mapping for different categories
const categoryIcons = {
  'Growth and Development': LightBulbIcon,
  'Biomechanics': ChartBarIcon,
  'Diagnosis': DocumentTextIcon,
  'Treatment Planning': DocumentTextIcon,
  'Appliances': DocumentDuplicateIcon,
  'Surgery': AcademicCapIcon,
  'Research': AcademicCapIcon,
  'default': DocumentTextIcon
};

// Default color for topic cards
const defaultColor = "from-green-500 to-emerald-600";

const TopicCard = ({ topic, isFetched = true }) => {
  const navigate = useNavigate();
  
  // Get the appropriate icon based on category or use default
  const getCategoryIcon = (category) => {
    if (!category) return DocumentTextIcon;
    const categoryKey = Object.keys(categoryIcons).find(key => 
      category.toLowerCase().includes(key.toLowerCase())
    );
    return categoryIcons[categoryKey] || categoryIcons.default;
  };

  const Icon = getCategoryIcon(topic.category);
  const tags = Array.isArray(topic.tags) ? topic.tags.slice(0, 3) : [];
  const color = topic.color || defaultColor;

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
        onClick={(e) => {
          e.preventDefault();
          navigate(`/summaries/${topic._id || topic.id}`);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            navigate(`/summaries/${topic._id || topic.id}`);
          }
        }}
      >
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="p-2 sm:p-3 rounded-xl bg-[#006D5B] shadow-lg">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-[#006D5B] mb-1 line-clamp-2 leading-snug">
                  {topic.title}
                </h3>
                {topic.category && (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#006D5B]/70" />
                    <span className="text-xs sm:text-sm text-[#4B4B4B]">
                      {topic.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-[#4B4B4B] leading-relaxed line-clamp-3">
              {isFetched ? topic.description : topic.teaser}
            </p>
            {tags.length > 0 && (
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
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
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TopicSummaries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch topics from API
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(TOPICS_ENDPOINT);
        console.log('Topic summaries response:', response.data);
        // Handle both direct array response and { data: [...] } format
        if (Array.isArray(response.data)) {
          setTopics(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          setTopics(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setTopics([]);
        }
      } catch (err) {
        console.error('Error fetching topic summaries:', err);
        setError('Failed to load topic summaries. Please try again later.');
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // Filter topics based on search query
  const filteredTopics = useMemo(() => {
    if (!Array.isArray(topics)) return [];
    
    if (!searchQuery.trim()) return topics;
    
    const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
    return topics.filter(topic => {
      const content = `${topic.title} ${topic.description || ''} ${topic.tags?.join(' ') || ''}`.toLowerCase();
      return searchTerms.every(term => content.includes(term));
    });
  }, [topics, searchQuery]);

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
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error loading topics</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#006D5B] hover:bg-[#005a4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006D5B]"
          >
            <ArrowPathIcon className="-ml-1 mr-2 h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 md:py-24 bg-[#DCE6D5]/30">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Learning Resources
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-medium text-[#006D5B] mb-2 sm:mb-4">
            Concept Capsules
          </h2>
          <p className="text-[#4B4B4B] max-w-2xl mx-auto text-xs sm:text-base md:text-lg px-2">
            Bite-sized, comprehensive summaries of key orthodontic concepts. Perfect for quick reviews and reinforcing your knowledge on the go.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006D5B] focus:border-transparent text-base"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchQuery("")}
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Topic Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredTopics.map((topic) => (
                <TopicCard key={topic._id || topic.id} topic={topic} isFetched={true} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No topics found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? "No topics match your search. Try a different term."
                : "No topics available at the moment. Please check back later."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopicSummaries;
