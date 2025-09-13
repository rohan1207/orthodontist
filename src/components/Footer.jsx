import React from "react";

const HERO_FONT = "Inter, Helvetica Neue, Arial, sans-serif";

const Footer = () => {
  return (
    <footer
      className="w-full bg-white border-t border-gray-200 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8"
      style={{ fontFamily: HERO_FONT }}
    >
      <div className="flex flex-col items-start">
        <span className="text-2xl font-light tracking-tight text-black mb-2">
          OrthoChronicles
        </span>
        <span className="text-gray-500 text-sm font-normal mb-2">
          Credible. Trusted Orthodontic Education.
        </span>
        <span className="text-gray-400 text-xs">
          © {new Date().getFullYear()} OrthoChronicles. All rights reserved.
        </span>
      </div>
      <div className="flex flex-row gap-8 items-center">
        <a
          href="#"
          className="text-gray-500 hover:text-black transition-colors text-sm font-medium"
        >
          Home
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-black transition-colors text-sm font-medium"
        >
          Articles
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-black transition-colors text-sm font-medium"
        >
          Top Books
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-black transition-colors text-sm font-medium"
        >
          Exam Preparation
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-black transition-colors text-sm font-medium"  
        >
          Topic Summaries
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-black transition-colors text-sm font-medium"
        >
          Academic Help
        </a>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <a
          href="#"
          aria-label="Instagram"
          className="text-gray-400 hover:text-black transition-colors"
        >
          <svg
            width="24"
            height="24"
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
          className="text-gray-400 hover:text-black transition-colors"
        >
          <svg
            width="24"
            height="24"
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
          className="text-gray-400 hover:text-black transition-colors"
        >
          <svg
            width="24"
            height="24"
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
    </footer>
  );
};

export default Footer;
