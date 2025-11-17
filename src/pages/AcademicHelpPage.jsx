import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function AcademicHelpPage() {
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    ppt_link: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.student_name.trim()) {
      setSubmitStatus({ success: false, message: 'Please enter your name' });
      return false;
    }
    if (!formData.student_email.trim()) {
      setSubmitStatus({ success: false, message: 'Please enter your email address' });
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.student_email)) {
      setSubmitStatus({ success: false, message: 'Please enter a valid email address' });
      return false;
    }
    if (!formData.ppt_link.trim()) {
      setSubmitStatus({ success: false, message: 'Please provide the Google Drive link' });
      return false;
    }
    if (!formData.ppt_link.includes('drive.google.com')) {
      setSubmitStatus({ success: false, message: 'Please provide a valid Google Drive link' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    try {
      const templateParams = {
        student_name: formData.student_name,
        student_email: formData.student_email,
        ppt_link: formData.ppt_link,
        message: formData.message || 'No additional message provided.',
        time: new Date().toLocaleString()
      };

      await emailjs.send(
        'service_54u4955',
        'template_wc7vjnt',
        templateParams,
        'U3_bHgCOmc4w08jja'
      );

      setSubmitStatus({ 
        success: true, 
        message: 'Your PPT refinement request has been submitted successfully! We will get back to you soon.'
      });
      setFormData({ student_name: '', student_email: '', ppt_link: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({ 
        success: false, 
        message: 'Failed to submit your request. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#DCE6D5]/30 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#006D5B] mb-4">
            PPT Refinement Service
          </h1>
          <p className="text-lg text-[#4B4B4B] max-w-3xl mx-auto">
            Submit your presentation for professional refinement and feedback from our experts.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
        >
          {submitStatus.message && (
            <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <div className="flex items-center">
                {submitStatus.success ? (
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                ) : (
                  <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                )}
                <span>{submitStatus.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="student_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="student_name"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="student_email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="student_email"
                  name="student_email"
                  value={formData.student_email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="ppt_link" className="block text-sm font-medium text-gray-700 mb-1">
                Google Drive Link to Your PPT <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="ppt_link"
                name="ppt_link"
                value={formData.ppt_link}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                placeholder="https://drive.google.com/..."
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Make sure the sharing settings are set to "Anyone with the link - Viewer"
              </p>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Instructions or Requirements
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                placeholder="Please include any specific requirements or areas you'd like us to focus on..."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                  isSubmitting 
                    ? 'bg-[#006D5B]/70 cursor-not-allowed' 
                    : 'bg-[#006D5B] hover:bg-[#005a4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006D5B]'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Refinement'}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6 sm:p-8"
        >
          <h2 className="text-xl font-semibold text-[#006D5B] mb-4">How It Works</h2>
          <ol className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-[#006D5B] text-white text-sm font-medium mr-3">1</span>
              <p className="text-gray-700">Upload your presentation to Google Drive and ensure the sharing settings are set to "Anyone with the link - Viewer"</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-[#006D5B] text-white text-sm font-medium mr-3">2</span>
              <p className="text-gray-700">Fill out the form above with your details and the Google Drive link to your presentation</p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-[#006D5B] text-white text-sm font-medium mr-3">3</span>
              <p className="text-gray-700">Our team will review your presentation and provide feedback and refinements within 2-3 business days</p>
            </li>
          </ol>
        </motion.div>
      </div>
    </div>
  );
}
