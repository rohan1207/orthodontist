import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
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
    if (!btnExpanded) {
      setBtnExpanded(true);
      return;
    }
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
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
      <div className={`pointer-events-none absolute -inset-24 bg-[#006D5B]/10 blur-2xl transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`} />

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
        variants={{ rest: { height: 0 }, active: { height: 80 } }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* bottom-left floating download button (left-pinned icon, center text) */}
      <motion.button
        type="button"
        onClick={handleDownloadClick}
        onHoverStart={() => setBtnExpanded(true)}
        onHoverEnd={() => setBtnExpanded(false)}
        className="absolute left-4 bottom-4 h-12 flex items-center border-2 border-[#006D5B] rounded-full shadow-md bg-white text-[#006D5B] font-semibold overflow-hidden relative"
        aria-label="Download"
        initial={false}
        animate={active ? (btnExpanded ? 'expandedVisible' : 'visible') : 'hidden'}
        variants={{
          hidden: { opacity: 0, pointerEvents: 'none', width: 0 },
          visible: { opacity: 1, pointerEvents: 'auto', width: 52 },
          expandedVisible: { opacity: 1, pointerEvents: 'auto', width: 'calc(100% - 32px)' }
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Icon Circle */}
        <motion.span
          className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#006D5B] bg-white"
          variants={{
            hidden: { marginLeft: 6 },
            visible: { marginLeft: 6 },
            expandedVisible: { marginLeft: 8 }
          }}
          transition={{ duration: 0.2 }}
        >
          <ArrowDownTrayIcon className="w-5 h-5 text-[#006D5B]" />
        </motion.span>

        {/* Expanding Text */}
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 text-[#111827] whitespace-nowrap"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0 },
            expandedVisible: { opacity: 1 }
          }}
          transition={{ duration: 0.2 }}
        >
          download
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

const ExamPreparationPage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8"
        >
          {loading ? (
            <div className="text-center col-span-full py-10">Loading...</div>
          ) : error ? (
            <div className="text-center col-span-full text-red-500 py-10">{error}</div>
          ) : (
            papers.map((paper) => (
              <ExamTopicCard key={paper._id} topic={paper} />
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExamPreparationPage;
