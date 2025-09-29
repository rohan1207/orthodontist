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
            Exam Preparation
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-[#005c4d] mb-3 md:mb-4"
          >
            Your Path to NEET MDS Success
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base md:text-xl text-[#4B4B4B] max-w-3xl mx-auto"
          >
            Structured preparation modules designed by top educators with proven success rates.
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

