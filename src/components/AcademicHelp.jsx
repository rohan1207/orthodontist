import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChatBubbleLeftEllipsisIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  DocumentDuplicateIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    id: 1,
    title: "Plagiarism Check",
    description:
      "Advanced AI-powered plagiarism detection with detailed similarity reports",
    icon: MagnifyingGlassIcon,
    color: "from-green-500 to-emerald-600",
    features: [
      "Complete similarity analysis",
      "Source identification",
      "Percentage breakdown",
    ],
  },
  {
    id: 2,
    title: "Proofreading",
    description:
      "Professional proofreading for grammar, spelling, and formatting",
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
    features: [
      "Structure analysis",
      "Content evaluation",
      "Improvement suggestions",
    ],
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
          background: `linear-gradient(to right, ${
            service.color.split(" ")[1]
          }, ${service.color.split(" ")[3]})`,
        }}
      />

      <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-[#006D5B]/10">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 md:p-4 rounded-xl bg-[#006D5B] shadow-lg">
            <service.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
          <div>
            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-[#006D5B] mb-1 sm:mb-2">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-[#4B4B4B]">
              {service.description}
            </p>
          </div>
        </div>

        <div className="bg-[#DCE6D5]/30 rounded-xl p-4 md:p-5">
          <h4 className="text-[#006D5B] font-semibold mb-3">Key Features:</h4>
          <ul className="space-y-3">
            {service.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-base text-[#4B4B4B]"
              >
                <div className="p-1 rounded-full bg-[#006D5B]/10 mr-3">
                  <ShieldCheckIcon className="w-4 h-4 text-[#006D5B]" />
                </div>
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="mt-6 flex justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to={`/services/${service.id}`}
            className="inline-flex items-center text-[#006D5B] hover:text-[#006D5B]/80 font-medium"
          >
            Learn More
            <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatsItem = ({ icon: Icon, value, label }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center p-6 md:p-8 bg-white rounded-xl shadow-lg border border-[#006D5B]/10 hover:shadow-xl transition-shadow duration-300"
  >
    <div className="p-3 rounded-xl bg-[#DCE6D5]/50 mb-4">
      <Icon className="w-8 h-8 text-[#006D5B]" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-3xl font-bold text-[#006D5B] mb-1"
    >
      {value}
    </motion.div>
    <div className="text-sm text-[#4B4B4B] text-center">{label}</div>
  </motion.div>
);

export default function AcademicHelp() {
  return (
    <section className="relative py-10 sm:py-16 md:py-24 bg-[#DCE6D5]">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center bg-gray-200 bg-opacity-20 backdrop-blur-[2px]">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#006D5B] mb-4">
          Coming Soon!
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-[#4B4B4B] max-w-md mx-auto">
          Our Academic Help section is under construction. We're working hard to
          bring you these services soon.
        </p>
      </div>

      <div
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pointer-events-none"
        aria-hidden="true"
      >
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-sm font-medium mb-4 border border-[#006D5B]/10"
          >
            <DocumentDuplicateIcon className="w-5 h-5" />
            Academic Support Services
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#006D5B] mb-3 sm:mb-4 md:mb-6"
          >
            Expert Academic Assistance
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm sm:text-base md:text-xl text-[#4B4B4B] max-w-3xl mx-auto px-2 sm:px-0"
          >
            Professional support for your academic journey with plagiarism
            checking, proofreading, and expert consultation services.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16">
          <StatsItem icon={ClockIcon} value="24/7" label="Support Available" />
          <StatsItem
            icon={DocumentTextIcon}
            value="99.9%"
            label="Accuracy Rate"
          />
          <StatsItem icon={ShieldCheckIcon} value="100%" label="Confidential" />
          <StatsItem
            icon={ChatBubbleLeftEllipsisIcon}
            value="2hr"
            label="Avg. Response Time"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Main CTA */}
        <div className="w-full flex justify-center mb-12">
          <Link
            to="/academic-help"
            className="group relative flex items-center justify-center bg-[#006D5B] text-white font-semibold border border-[#006D5B]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-visible"
            style={{
              width: "300px",
              height: "75px",
              borderRadius: "50px",
              textDecoration: "none",
            }}
          >
            {/* Tooth peeks from top center on hover/click */}
            <div className="pointer-events-none absolute left-1/2 top-0 z-[3] -translate-x-1/2 -translate-y-2 opacity-0 scale-90 transition-all duration-300 ease-out group-hover:-translate-y-8 group-hover:opacity-100 group-hover:scale-100 group-active:translate-y-10 text-xl">
              <img
                src="/tooth_peak.png"
                alt=""
                className="w-16 h-16 drop-shadow-lg"
              />
            </div>
            <span className="relative z-[2] text-lg">Explore All Services</span>
          </Link>
        </div>

        {/* Additional Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-[#006D5B] text-white py-12 md:py-16 px-4 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need Immediate Academic Support?
          </h3>
          <p className="text-base md:text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Our expert team is available 24/7 to help you with your academic
            needs. Get started with a free consultation.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-[#006D5B] bg-white rounded-xl font-semibold hover:bg-[#DCE6D5] transition-all duration-300"
            >
              Schedule Consultation
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-white border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              View Service Details
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
