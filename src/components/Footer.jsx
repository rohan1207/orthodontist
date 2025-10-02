import React from "react";
import { Link } from "react-router-dom";

const HERO_FONT = "Inter, Helvetica Neue, Arial, sans-serif";

const Footer = () => {
  return (
    <footer
      className="w-full bg-[#006D5B] border-t border-[#006D5B]/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: HERO_FONT }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-3">
            <img
              src="/newlogo.png"
              alt="Logo"
              className="h-16 w-auto md:h-[75px] md:w-[185px]"
            />
            
            

            
          </div>
              <p className="text-white/90 text-base mb-4 text-center sm:text-left">
                Credible. Trusted Orthodontic Education.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17" cy="7" r="1" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 19c8 0 12-7 12-13v-1a8.38 8.38 0 0 0 2-2c-1 .5-2 .8-3 .9A4.48 4.48 0 0 0 22 3a8.94 8.94 0 0 1-2.8 1.1A4.48 4.48 0 0 0 12 7c0 .4 0 .8.1 1.2A12.94 12.94 0 0 1 3 4s-4 9 5 13c-1.5 1-3.2 1.6-5 1.6.7 0 1.4-.1 2-.3" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M8 11v5M8 8v.01M12 11v5m0-5a2 2 0 0 1 4 0v5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-white/90 hover:text-white transition-colors duration-300">Home</Link>
              <Link to="/articles" className="text-white/90 hover:text-white transition-colors duration-300">Articles</Link>
              <Link to="/top-books" className="text-white/90 hover:text-white transition-colors duration-300">Top Books</Link>
              <Link to="/contact" className="text-white/90 hover:text-white transition-colors duration-300">Contact</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <div className="flex flex-col space-y-3">
              <Link to="/exam-prep" className="text-white/90 hover:text-white transition-colors duration-300">Exam Preparation</Link>
              <Link to="/summaries" className="text-white/90 hover:text-white transition-colors duration-300">Concept Capsules</Link>
              <Link to="/academic-help" className="text-white/90 hover:text-white transition-colors duration-300">Academic Help</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:orthochronicles@gmail.com"
                className="text-white/90 hover:text-white transition-colors duration-300"
              >
                orthochronicles@gmail.com
              </a>
              <a
                href="tel:+1234567890"
                className="text-white/90 hover:text-white transition-colors duration-300"
              >
                +1 (234) 567-890
              </a>
              <Link
                to="/contact"
                className="text-white/90 hover:text-white transition-colors duration-300"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-white text-sm text-center sm:text-left">
            © {new Date().getFullYear()} OrthoChronicles. All rights reserved. <br />
           
          </span>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
            <a href="#" className="text-white/90 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
