import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, ArrowDownTrayIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { buildApiUrl, getGoogleDriveDownloadUrl } from '../utils/api';

const ExamTopicCard = ({ topic }) => {
  const [isActive, setIsActive] = useState(false);
  const [btnExpanded, setBtnExpanded] = useState(false);
  const downloadUrl = getGoogleDriveDownloadUrl(topic.downloadUrl);
  const active = isActive;

  const handleCardTap = () => {
    setIsActive((v) => !v);
    setBtnExpanded(false);
  };

  const handleDownloadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Immediately trigger the download
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    // Set expanded to true for visual feedback, especially on hover
    setBtnExpanded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={active ? { y: -8 } : { y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-[#006D5B]/10 bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden flex flex-col"
      onHoverStart={() => { setIsActive(true); }}
      onHoverEnd={() => { setIsActive(false); setBtnExpanded(false); }}
      onClick={handleCardTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleCardTap(); } }}
    >
      {/* soft glow on active */}
      <div className={`pointer-events-none absolute -inset-24 blur-2xl transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`} />

      <div className="p-6 pb-6 flex-grow">
        <h3 className="text-lg md:text-xl font-extrabold text-[#006D5B] tracking-tight mb-2">
          {topic.name}
        </h3>
        <p
          className="text-[#4B4B4B] text-sm"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {topic.description}
        </p>
        {topic.answersNote && (
          <p className="mt-2 text-xs text-gray-500 italic">{topic.answersNote}</p>
        )}
      </div>

      {/* bottom grow area so the card extends from the bottom */}
      <motion.div
        className="w-full"
        initial={false}
        animate={active ? 'active' : 'rest'}
        variants={{ rest: { height: 0 }, active: { height: 'auto' } }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="h-20" />
      </motion.div>

      {/* bottom-left floating download button (left-pinned icon, center text) */}
      <motion.button
        type="button"
        onClick={handleDownloadClick}
        onHoverStart={() => setBtnExpanded(true)}
        onHoverEnd={() => setBtnExpanded(false)}
        className="absolute left-4 sm:left-6 bottom-4 h-12 flex items-center rounded-full shadow-md font-semibold"
        aria-label="Download"
        initial={false}
        animate={active ? (btnExpanded ? "expandedVisible" : "visible") : "hidden"}
        variants={{
          hidden: { opacity: 0, pointerEvents: "none", width: 0 },
          visible: { 
            opacity: 1, 
            pointerEvents: "auto", 
            width: 52, 
            backgroundColor: "#FFFFFF", 
            border: "2px solid #006D5B",
            color: "#006D5B"
          },
          expandedVisible: { 
            opacity: 1, 
            pointerEvents: "auto", 
            width: `calc(100% - ${window.innerWidth < 640 ? '32px' : '48px'})`,
            backgroundColor: "#006D5B",  
            border: "2px solid #006D5B",
            color: "#FFFFFF" 
          }
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Icon Circle */}
        <motion.span
          className="flex items-center justify-center rounded-full bg-white z-10"
          variants={{
            hidden: { marginLeft: 6, width: 36, height: 36, scale: 1, borderColor: "#006D5B", borderWidth: 2 },
            visible: { marginLeft: 6, width: 36, height: 36, scale: 1, borderColor: "#006D5B", borderWidth: 2 },
            expandedVisible: { 
              marginLeft: 4, 
              width: 42, 
              height: 42, 
              scale: 1.3, 
              borderColor: "transparent",
              borderWidth: 0
            }
          }}
          transition={{ duration: 0.25 }}
        >
          <ArrowDownTrayIcon className="w-5 h-5 text-[#006D5B]" />
        </motion.span>

        {/* Expanding Text */}
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0 },
            expandedVisible: { opacity: 1 }
          }}
          transition={{ duration: 0.2 }}
        >
          Download
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

const ExamPreparationPage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await fetch(buildApiUrl('/api/exampreps'));
        if (!res.ok) {
          throw new Error('Failed to fetch exam papers');
        }
        const data = await res.json();
        setPapers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(papers.map(paper => paper.category || 'Uncategorized'))];
    return ['All', ...uniqueCategories.sort()];
  }, [papers]);

  // Filter papers based on search and category
  const filteredPapers = useMemo(() => {
    let filtered = papers;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(paper => (paper.category || 'Uncategorized') === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(paper => 
        paper.name.toLowerCase().includes(query) ||
        paper.description.toLowerCase().includes(query) ||
        (paper.category && paper.category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [papers, selectedCategory, searchQuery]);

  // Group filtered papers by category
  const papersByCategory = filteredPapers.reduce((acc, paper) => {
    const category = paper.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(paper);
    return acc;
  }, {});

  return (
    <div className="bg-[#F9F9F9] min-h-screen mt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-sm font-medium mb-4 border border-[#006D5B]/10">
            <AcademicCapIcon className="w-5 h-5" />
            Exam Preparation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#006D5B] mb-3">
            Exam Preparation Modules
          </h1>
          <p className="text-lg text-[#4B4B4B] max-w-3xl mx-auto">
            Browse topics, view year-wise papers, and download resources for your exam success.
          </p>
        </header>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10 max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <MagnifyingGlassIcon className="w-5 h-5 text-[#006D5B] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exam papers..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#006D5B]/20 bg-white text-[#4B4B4B] placeholder-[#4B4B4B]/60 focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20 shadow-sm transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative sm:w-64">
              <FunnelIcon className="w-5 h-5 text-[#006D5B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#006D5B]/20 bg-white text-[#4B4B4B] focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20 shadow-sm appearance-none cursor-pointer transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'All' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center sm:text-left">
            <p className="text-sm text-[#4B4B4B]">
              Showing <span className="font-semibold text-[#006D5B]">{filteredPapers.length}</span> {filteredPapers.length === 1 ? 'paper' : 'papers'}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : filteredPapers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-[#006D5B] mb-2">No papers found</h3>
            <p className="text-[#4B4B4B] mb-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-6 py-2 bg-[#006D5B] text-white rounded-lg hover:bg-[#005c4d] transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          Object.entries(papersByCategory).map(([category, categoryPapers]) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-[#006D5B] mb-6 px-4">{category}</h2>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8"
              >
                {categoryPapers.map((paper) => (
                  <ExamTopicCard key={paper._id} topic={paper} />
                ))}
              </motion.div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default ExamPreparationPage;