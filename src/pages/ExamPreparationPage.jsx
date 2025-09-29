import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { buildApiUrl, getGoogleDriveDownloadUrl } from '../utils/api';

const ExamTopicCard = ({ topic }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border border-[#006D5B]/10"
    >
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-[#006D5B] mb-2">{topic.name}</h3>
        <p className="text-[#4B4B4B] text-sm mb-4">{topic.description}</p>
        {topic.answersNote && (
          <p className="text-xs text-gray-500 italic">{topic.answersNote}</p>
        )}
      </div>
      <div className="bg-gray-50 p-4">
        <a
          href={getGoogleDriveDownloadUrl(topic.downloadUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full group inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#006D5B] rounded-lg hover:bg-[#005c4d] transition-colors"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Download Papers
        </a>
      </div>
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
