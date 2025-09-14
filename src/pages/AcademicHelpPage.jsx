import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChatBubbleLeftEllipsisIcon,
  MagnifyingGlassIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PaperClipIcon,
  PencilIcon,
  AcademicCapIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const services = [
  {
    id: 'plagiarism',
    title: "Plagiarism Check",
    description: "Get a comprehensive plagiarism report with source matching and similarity percentages.",
    icon: MagnifyingGlassIcon,
    color: "from-green-500 to-emerald-600",
    features: [
      "AI-powered similarity detection",
      "Source identification and links",
      "Percentage breakdown by section",
      "Detailed similarity report",
      "Suggestions for improvement"
    ],
    pricing: "From  ₹1000 per document"
  },
  {
    id: 'proofreading',
    title: "Professional Proofreading",
    description: "Expert proofreading and editing services for academic documents.",
    icon: PencilIcon,
    color: "from-green-500 to-emerald-600",
    features: [
      "Grammar and spelling check",
      "Style improvement suggestions",
      "Structure enhancement",
      "Citation format checking",
      "24-48 hour turnaround"
    ],
    pricing: "From  ₹150 per 1000 words"
  },
  {
    id: 'review',
    title: "Article Review",
    description: "In-depth review and feedback on research articles and academic papers.",
    icon: DocumentTextIcon,
    color: "from-green-500 to-emerald-600",
    features: [
      "Content evaluation",
      "Methodology assessment",
      "Literature review feedback",
      "Structure analysis",
      "Improvement recommendations"
    ],
    pricing: "From  ₹2500 per article"
  },
  {
    id: 'consultation',
    title: "Academic Consultation",
    description: "One-on-one consultation with academic experts for guidance and support.",
    icon: ChatBubbleLeftEllipsisIcon,
    color: "from-green-500 to-emerald-600",
    features: [
      "24/7 expert support",
      "Topic selection guidance",
      "Research methodology help",
      "Writing structure advice",
      "Citation assistance"
    ],
    pricing: "From  ₹3000 per hour"
  }
];

const FileUploadForm = ({ service }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="max-w-xl">
        <label
          className={`flex justify-center w-full h-32 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-500 focus:outline-none
             ₹{file ? 'border-green-500 bg-green-50' : 'bg-white'}`}
        >
          <div className="flex flex-col items-center justify-center">
            {!file ? (
              <>
                <CloudArrowUpIcon className="w-10 h-10 text-gray-400" />
                <p className="text-sm text-gray-600">Drop your file here or click to upload</p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
              </>
            ) : (
              <>
                <CheckCircleIcon className="w-10 h-10 text-green-500" />
                <p className="text-sm text-green-600">{file.name}</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf,.doc,.docx"
          />
        </label>

        {file && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            type="submit"
            disabled={loading}
            className={`mt-4 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md
               ₹{loading ? 'bg-gray-400' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90'}`}
          >
            {loading ? (
              <span className="flex items-center">
                Processing...
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="ml-2"
                >
                  ⚪
                </motion.span>
              </span>
            ) : (
              <>Submit Document</>
            )}
          </motion.button>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-green-50 rounded-md"
          >
            <div className="flex items-center">
              <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700">Document submitted successfully!</span>
            </div>
          </motion.div>
        )}
      </div>
    </form>
  );
};

const ServiceDetails = ({ service }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-8">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-4 rounded-xl bg-gradient-to-r  ₹{service.color}`}>
          <service.icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Features & Benefits</h4>
          <ul className="space-y-3">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">{service.pricing}</div>
            <p className="text-gray-600">Includes detailed report and recommendations</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Upload Document</h4>
          <FileUploadForm service={service} />
        </div>
      </div>
    </div>
  );
};

export default function AcademicHelpPage() {
  const [selectedService, setSelectedService] = useState(services[0]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-4"
          >
            <AcademicCapIcon className="w-5 h-5" />
            Academic Support Center
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Professional Academic Services
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Get expert assistance with plagiarism checking, proofreading, article reviews, and academic consultations.
          </motion.p>
        </div>

        {/* Service Navigation */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {services.map((service) => (
            <motion.button
              key={service.id}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedService(service)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors
                 ₹{selectedService.id === service.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50'}`}
            >
              <service.icon className="w-5 h-5" />
              {service.title}
            </motion.button>
          ))}
        </div>

        {/* Selected Service Details */}
        <motion.div
          key={selectedService.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ServiceDetails service={selectedService} />
        </motion.div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <ShieldCheckIcon className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Confidential</h3>
              <p className="text-gray-600">Your documents and personal information are completely secure and private.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <ClockIcon className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">Quick processing times with most services completed within 24-48 hours.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <BookOpenIcon className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">Access to experienced academics and professionals in various fields.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}