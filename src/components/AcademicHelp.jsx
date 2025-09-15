import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChatBubbleLeftEllipsisIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  DocumentDuplicateIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

const services = [
  {
    id: 1,
    title: "Plagiarism Check",
    description: "Advanced AI-powered plagiarism detection with detailed similarity reports",
    icon: MagnifyingGlassIcon,
    color: "from-green-500 to-emerald-600",
    features: ["Complete similarity analysis", "Source identification", "Percentage breakdown"],
  },
  {
    id: 2,
    title: "Proofreading",
    description: "Professional proofreading for grammar, spelling, and formatting",
    icon: PencilIcon,
    color: "from-green-500 to-emerald-600",
    features: ["Grammar correction", "Spelling check", "Style improvements"],
  },
  {
    id: 3,
    title: "Article Review",
    description: "Expert review and feedback on research articles and papers",
    icon: DocumentTextIcon,
    color: "from-green-500 to-emerald-600",
    features: ["Structure analysis", "Content evaluation", "Improvement suggestions"],
  },
  {
    id: 4,
    title: "Quick Consultation",
    description: "24/7 academic guidance and consultation services",
    icon: ChatBubbleLeftEllipsisIcon,
    color: "from-green-500 to-emerald-600",
    features: ["Expert guidance", "Quick response", "Personalized help"],
  },
];

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      <div 
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"
        style={{ 
          background: `linear-gradient(to right, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})`,
        }}
      />
      
      <div className="relative bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color}`}>
            <service.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{service.description}</p>
        
        <ul className="space-y-2 mb-4">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <ShieldCheckIcon className="w-4 h-4 mr-2 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const StatsItem = ({ icon: Icon, value, label }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg"
  >
    <Icon className="w-8 h-8 text-green-500 mb-2" />
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-sm text-gray-600 text-center">{label}</div>
  </motion.div>
);

export default function AcademicHelp() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-4"
          >
            <DocumentDuplicateIcon className="w-5 h-5" />
            Academic Support Services
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
          >
            Expert Academic Assistance
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Professional support for your academic journey with plagiarism checking, proofreading, and expert consultation services.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          <StatsItem 
            icon={ClockIcon}
            value="24/7"
            label="Support Available"
          />
          <StatsItem 
            icon={DocumentTextIcon}
            value="99.9%"
            label="Accuracy Rate"
          />
          <StatsItem 
            icon={ShieldCheckIcon}
            value="100%"
            label="Confidential"
          />
          <StatsItem 
            icon={ChatBubbleLeftEllipsisIcon}
            value="2hr"
            label="Avg. Response Time"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link
            to="/academic-help"
            className="group inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-base md:text-lg hover:opacity-90 transition-opacity duration-200"
          >
            Explore All Academic Services
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