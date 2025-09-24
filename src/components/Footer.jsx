import React from "react";

const HERO_FONT = "Inter, Helvetica Neue, Arial, sans-serif";

const Footer = () => {
  return (
    <footer
      className="w-full bg-[#DCE6D5]/30 border-t border-[#006D5B]/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: HERO_FONT }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex flex-col items-start">
              <span className="text-2xl font-semibold text-[#006D5B] mb-3">
                OrthoChronicles
              </span>
              <span className="text-[#4B4B4B] text-base mb-4">
                Credible. Trusted Orthodontic Education.
              </span>
              <div className="flex items-center gap-4 mb-6">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="p-2 rounded-full bg-[#006D5B]/10 text-[#006D5B] hover:bg-[#006D5B]/20 transition-colors duration-300"
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
                  className="p-2 rounded-full bg-[#006D5B]/10 text-[#006D5B] hover:bg-[#006D5B]/20 transition-colors duration-300"
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
                  className="p-2 rounded-full bg-[#006D5B]/10 text-[#006D5B] hover:bg-[#006D5B]/20 transition-colors duration-300"
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
            <h3 className="text-[#006D5B] font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="#"
                className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
              >
                Articles
              </a>
              <a
                href="#"
                className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
              >
                Top Books
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[#006D5B] font-semibold mb-4">Resources</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
              >
                Exam Preparation
              </a>
              <a
                href="#"
                className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
              >
                Topic Summaries
              </a>
              <a
                href="#"
                className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
              >
                Academic Help
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#006D5B] font-semibold mb-4">Contact Us</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:info@orthochronicles.com"
                className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
              >
                info@orthochronicles.com
              </a>
              <a
                href="#"
                className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
              >
                Support Center
              </a>
              <a
                href="#"
                className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#006D5B]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[#4B4B4B] text-sm">
            © {new Date().getFullYear()} OrthoChronicles. All rights reserved.
          </span>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-[#4B4B4B] hover:text-[#006D5B] transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
