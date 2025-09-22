import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Import font (e.g., 'Inter', 'Montserrat', or 'Helvetica Neue')
const fontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap";
const poppinsUrl =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap";
if (typeof window !== "undefined") {
  const link = document.createElement("link");
  link.href = fontUrl;
  link.rel = "stylesheet";
  document.head.appendChild(link);

  const link2 = document.createElement("link");
  link2.href = poppinsUrl;
  link2.rel = "stylesheet";
  document.head.appendChild(link2);
}

const NAV_FONT = "Inter, Helvetica Neue, Arial, sans-serif";
const MENU_FONT = "Poppins, Inter, Helvetica Neue, Arial, sans-serif";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/articles" },
    { name: "Top Books", href: "/top-books" },
    { name: "Exam Preparation", href: "/exam-prep" },
    { name: "Topic Summaries", href: "/summaries" },
    { name: "Academic Help", href: "/academic-help" },
  ];

  return (
    <>
      <nav
        className={
          "fixed top-0 left-1/2 transform -translate-x-1/2 z-50 rounded-b-[20px] bg-[#DCE6D5]/95 shadow-sm border-b border-[#006D5B]/10 backdrop-blur-sm"
        }
        style={{
          fontFamily: NAV_FONT,
          width: "min(1728px, 100%)",
          height: "101px",
        }}
      >
        <div className="w-full h-full mx-auto flex items-center justify-between px-6 md:px-[28px]">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo2.png"
              alt="Logo"
              className="h-10 w-10 md:h-14 md:w-14"
            />
            <Link to="/">
              <span
                className="text-lg font-normal tracking-wide text-[#006D5B]"
                style={{ letterSpacing: "0.08em" }}
              >
                OrthoChronicles
              </span>
              <span
                className="text-sm font-light block text-slate-500"
                style={{ letterSpacing: "0.1em", marginTop: "-4px" }}
              >
                From Braces To Breakthroughs
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-[#006D5B] hover:text-[#004B3F] transition-colors duration-300"
                style={{
                  fontFamily: MENU_FONT,
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/contact"
              className="hidden md:flex items-center justify-center text-white hover:text-white/90 transition-all duration-300"
              style={{
                width: "184px",
                height: "46px",
                background: "#006D5B",
                borderRadius: "25px",
                fontFamily: MENU_FONT,
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                opacity: 1,
                boxShadow: "0 2px 4px rgba(0, 109, 91, 0.1)",
              }}
            >
              Contact Us
            </Link>
            <button
              className="lg:hidden p-2 rounded focus:outline-none"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="16" x2="24" y2="16" />
                <line x1="8" y1="24" x2="16" y2="24" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Popup Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-full z-[60] bg-[#DCE6D5]/98 backdrop-blur-lg"
            style={{ fontFamily: NAV_FONT }}
          >
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center h-full gap-4">
              {menuItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.05, x: 6 }}
                  className="text-gray-900 px-6 py-2 rounded transition-all duration-200"
                  style={{
                    fontFamily: MENU_FONT,
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <button
                className="absolute top-6 right-6 p-2"
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
