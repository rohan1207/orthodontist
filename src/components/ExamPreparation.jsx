import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { buildApiUrl, getGoogleDriveDownloadUrl } from '../utils/api';

const ExamTopicCard = ({ topic }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    rest: { backgroundColor: '#F3F4F6', y: 0 },
    hover: { backgroundColor: '#E5E7EB', y: -8 },
  };

  const contentVariants = {
    rest: { y: 0 },
    hover: { y: -40 },
  };

  const buttonContainerVariants = {
    rest: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0, transition: { delay: 0.1 } },
  };

  const downloadButtonVariants = {
    rest: { width: '3rem', backgroundColor: '#FFFFFF' },
    hover: { width: '9rem', backgroundColor: '#FFFFFF' },
  };

  const downloadTextVariants = {
    rest: { opacity: 0, x: -10 },
    hover: { opacity: 1, x: 0, transition: { delay: 0.15 } },
  };

  return (
    <motion.div
      className="relative rounded-2xl shadow-lg overflow-hidden cursor-pointer"
      style={{ minHeight: '180px' }}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate={isHovered ? 'hover' : 'rest'}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTap={() => setIsHovered(!isHovered)} // Toggle for touch devices
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
    >
      <motion.div className="p-6" variants={contentVariants}>
        <h3 className="text-lg md:text-xl font-extrabold text-[#005c4d] tracking-tight mb-2">
          {topic.name}
        </h3>
        <p className="text-gray-600 text-sm">{topic.description}</p>
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center"
        variants={buttonContainerVariants}
      >
        <motion.a
          href={getGoogleDriveDownloadUrl(topic.downloadUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 h-12 rounded-full shadow-md"
          variants={downloadButtonVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ArrowDownTrayIcon className="w-6 h-6 text-[#006D5B] flex-shrink-0 ml-3" />
          <motion.span
            className="text-sm font-semibold text-[#006D5B] whitespace-nowrap mr-4"
            variants={downloadTextVariants}
          >
            Download
          </motion.span>
        </motion.a>
      </motion.div>
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

