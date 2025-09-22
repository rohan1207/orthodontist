import React, { useState } from "react";
import { motion } from "framer-motion";
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
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    id: "plagiarism",
    title: "Plagiarism Check",
    description:
      "Get a comprehensive plagiarism report with source matching and similarity percentages.",
    icon: MagnifyingGlassIcon,
    color: "from-green-500 to-emerald-600",
    features: [
      "AI-powered similarity detection",
      "Source identification and links",
      "Percentage breakdown by section",
      "Detailed similarity report",
      "Suggestions for improvement",
    ],
    pricing: "From  ₹1000 per document",
  },
  {
    id: "proofreading",
    title: "Professional Proofreading",
    description:
      "Expert proofreading and editing services for academic documents.",
    icon: PencilIcon,
    color: "from-green-500 to-emerald-600",
    features: [
      "Grammar and spelling check",
      "Style improvement suggestions",
      "Structure enhancement",
      "Citation format checking",
      "24-48 hour turnaround",
    ],
    pricing: "From  ₹150 per 1000 words",
  },
  {
    id: "review",
    title: "Article Review",
    description:
      "In-depth review and feedback on research articles and academic papers.",
    icon: DocumentTextIcon,
    color: "from-green-500 to-emerald-600",
    features: [
      "Content evaluation",
      "Methodology assessment",
      "Literature review feedback",
      "Structure analysis",
      "Improvement recommendations",
    ],
    pricing: "From  ₹2500 per article",
  },
  {
    id: "consultation",
    title: "Academic Consultation",
    description:
      "One-on-one consultation with academic experts for guidance and support.",
    icon: ChatBubbleLeftEllipsisIcon,
    color: "from-green-500 to-emerald-600",
    features: [
      "24/7 expert support",
      "Topic selection guidance",
      "Research methodology help",
      "Writing structure advice",
      "Citation assistance",
    ],
    pricing: "From  ₹3000 per hour",
  },
];

const FileUploadForm = ({ service }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError("File size must be less than 10MB.");
      setFile(null);
    } else {
      setFile(selectedFile);
      setError("");
      setSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSuccess(true);
    setFile(null); // Reset after successful submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className={`flex flex-col items-center justify-center w-full h-40 px-4 transition-all duration-300 border-2 border-dashed rounded-2xl cursor-pointer ${file ? 'border-[#006D5B]' : 'border-[#006D5B]/20'} bg-[#DCE6D5]/20 hover:bg-[#DCE6D5]/40`}>
        <div className="flex flex-col items-center justify-center text-center">
          {file ? (
            <>
              <CheckCircleIcon className="w-10 h-10 text-[#006D5B]" />
              <p className="text-sm font-medium text-[#006D5B] mt-2">{file.name}</p>
              <p className="text-xs text-[#4B4B4B]/70">Ready to submit!</p>
            </>
          ) : (
            <>
              <CloudArrowUpIcon className="w-10 h-10 text-[#006D5B]/50" />
              <p className="text-sm text-[#4B4B4B] mt-2">Drop your file here or <span className="font-semibold text-[#006D5B]">click to upload</span></p>
              <p className="text-xs text-[#4B4B4B]/60">PDF, DOC, DOCX (max 10MB)</p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
        />
      </label>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <ExclamationCircleIcon className="w-5 h-5" />
          {error}
        </div>
      )}

      <motion.button
        type="submit"
        disabled={!file || loading || success}
        className="w-full flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: success ? '#10B981' : '#006D5B' }}
        whileHover={{ scale: !file || loading || success ? 1 : 1.02 }}
        whileTap={{ scale: !file || loading || success ? 1 : 0.98 }}
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full mr-2"
            />
            Processing...
          </>
        ) : success ? (
          <>
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            Submitted Successfully!
          </>
        ) : (
          'Submit Document'
        )}
      </motion.button>
    </form>
  );
};

const ServiceDetails = ({ service }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-xl bg-[#006D5B]/10">
          <service.icon className="w-8 h-8 text-[#006D5B]" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#006D5B]">{service.title}</h3>
          <p className="text-[#4B4B4B]">{service.description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <h4 className="text-lg font-semibold text-[#4B4B4B] mb-4 border-b border-[#006D5B]/10 pb-2">
            Features & Benefits
          </h4>
          <ul className="space-y-3">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-[#006D5B] mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-[#4B4B4B]">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 bg-[#DCE6D5]/40 rounded-xl p-4 text-center">
            <p className="text-sm text-[#4B4B4B] mb-1">Starting From</p>
            <div className="text-3xl font-bold text-[#006D5B]">
              {service.pricing}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-[#4B4B4B] mb-4 border-b border-[#006D5B]/10 pb-2">
            Upload Your Document
          </h4>
          <FileUploadForm service={service} />
        </div>
      </div>
    </div>
  );
};

export default function AcademicHelpPage() {
  const [selectedService, setSelectedService] = useState(services[0]);

  return (
    <div className="min-h-screen bg-[#DCE6D5]/30 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-sm font-medium mb-4"
          >
            <AcademicCapIcon className="w-5 h-5" />
            Academic Support Center
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#006D5B] mb-4"
          >
            Professional Academic Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#4B4B4B] max-w-3xl mx-auto"
          >
            Elevate your work with expert assistance in plagiarism checking, proofreading, article reviews, and academic consultations.
          </motion.p>
        </div>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-12">
          {/* Service Navigation */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="text-lg font-semibold text-[#4B4B4B] mb-4 px-4">Our Services</h3>
            <div className="space-y-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-300 ${
                    selectedService.id === service.id
                      ? 'bg-[#006D5B] text-white shadow-lg'
                      : 'bg-transparent text-[#4B4B4B] hover:bg-[#006D5B]/5 hover:text-[#006D5B]'
                  }`}
                >
                  <service.icon className={`w-6 h-6 ${selectedService.id === service.id ? 'text-white' : 'text-[#006D5B]'}`} />
                  <span>{service.title}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Selected Service Details */}
          <motion.div
            key={selectedService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <ServiceDetails service={selectedService} />
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-[#006D5B] mb-12 text-center">
            Why Choose OrthoChronicles?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-[#006D5B]/10"
            >
              <ShieldCheckIcon className="w-12 h-12 text-[#006D5B] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-[#4B4B4B] mb-2">
                100% Confidential
              </h3>
              <p className="text-[#4B4B4B]/80">
                Your documents and personal information are kept completely secure and private.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-[#006D5B]/10"
            >
              <ClockIcon className="w-12 h-12 text-[#006D5B] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-[#4B4B4B] mb-2">
                Fast Turnaround
              </h3>
              <p className="text-[#4B4B4B]/80">
                Receive quick processing, with most services completed within 24-48 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-[#006D5B]/10"
            >
              <BookOpenIcon className="w-12 h-12 text-[#006D5B] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-[#4B4B4B] mb-2">
                Expert Team
              </h3>
              <p className="text-[#4B4B4B]/80">
                Our team consists of experienced academics and professionals in the orthodontic field.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
