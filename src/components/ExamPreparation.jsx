import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { buildApiUrl, getGoogleDriveDownloadUrl } from '../utils/api';

const ExamTopicCard = ({ topic }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 220, damping: 18 }}
      className="group relative rounded-2xl border border-[#006D5B]/10 bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden flex flex-col hover:shadow-2xl"
    >
      {/* soft glow on hover */}
      <div
        className="pointer-events-none absolute -inset-24 bg-[#006D5B]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="p-6 flex-grow">
        <h3 className="text-lg md:text-xl font-extrabold text-[#006D5B] tracking-tight mb-2">
          {topic.name}
        </h3>
        <p className="text-[#4B4B4B] text-sm mb-4">{topic.description}</p>
        {topic.answersNote && (
          <p className="text-xs text-gray-500 italic">{topic.answersNote}</p>
        )}
      </div>

      <div className="p-4 bg-gradient-to-b from-gray-50 to-white flex justify-center">
        <motion.a
          href={getGoogleDriveDownloadUrl(topic.downloadUrl)}
          target="_blank"
          rel="noopener noreferrer"
          initial="rest"
          animate="rest"
          whileHover="hover"
          className="relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-[#006D5B] px-5 py-2 text-sm font-semibold"
        >
          {/* liquid fill */}
          <motion.span
            className="absolute left-0 top-0 h-full w-0 bg-[#006D5B]"
            variants={{ rest: { width: '0%' }, hover: { width: '100%' } }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          {/* flowing line */}
          <motion.span
            className="absolute bottom-0 left-0 h-[3px] w-1/3 bg-white/60 mix-blend-overlay"
            variants={{ rest: { opacity: 0, x: '-120%' }, hover: { opacity: 1, x: '120%' } }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
          />

          {/* content with color transition */}
          <motion.span
            className="relative z-10 flex items-center gap-2"
            variants={{ rest: { color: '#006D5B' }, hover: { color: '#ffffff' } }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              variants={{ rest: { y: -6, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
              transition={{ type: 'spring', stiffness: 500, damping: 16 }}
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
            </motion.span>
            <span>Download Papers</span>
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  );
};

const ExamPreparation = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await fetch(buildApiUrl('/api/exampreps?limit=3')); // Fetch only 3 for the homepage section
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
    <section className="py-16 md:py-24 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-sm font-medium mb-4 border border-[#006D5B]/10"
          >
            <AcademicCapIcon className="w-5 h-5" />
            Ace Every Exam
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-[#005c4d] mb-3 md:mb-4"
          >
            Your Path to Success
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base md:text-xl text-[#4B4B4B] max-w-3xl mx-auto"
          >
           Explore our thoroughly organized question banks to ensure comprehensive coverage of every
study topic, and make use of our mindmaps to craft clearer, more concise answers in your
exams.
          </motion.p>
        </div>

        {loading ? (
          <div className="text-center col-span-full py-10">Loading exam papers...</div>
        ) : error ? (
          <div className="text-center col-span-full text-red-500 py-10">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {papers.map((topic) => (
              <ExamTopicCard key={topic._id} topic={topic} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <Link
            to="/exam-prep"
            className="group inline-flex items-center gap-2 text-[#006D5B] hover:text-[#005c4d] font-semibold text-base md:text-lg"
          >
            View All Preparation Modules
            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ExamPreparation;

