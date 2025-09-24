import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

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
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <div key={item.name} className="relative group">
                  {/* Subtle hover background */}
                  <span
                    className={`pointer-events-none absolute inset-0 rounded-full bg-[#006D5B]/10 transition-opacity duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></span>

                  <Link
                    to={item.href}
                    className={`relative z-10 inline-flex items-center px-4 py-2 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006D5B]/30 focus-visible:ring-offset-2 ${
                      isActive
                        ? "text-[#004B3F]"
                        : "text-[#006D5B] group-hover:text-[#004B3F]"
                    }`}
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

                  {/* Running underline */}
                  <span
                    className={`pointer-events-none absolute left-3 right-3 bottom-1 h-[2px] rounded-full transform origin-left transition-transform duration-300 ease-out ${
                      isActive
                        ? "bg-[#004B3F] scale-x-100"
                        : "bg-[#006D5B] scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </div>
              );
            })}
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
              className="lg:hidden p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006D5B] transition-all"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20"
                  stroke="#006D5B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 12H20"
                  stroke="#006D5B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 18H20"
                  stroke="#006D5B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Popup Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 w-full h-full z-[60] bg-[#DCE6D5]"
            style={{ fontFamily: NAV_FONT }}
          >
            <div className="w-full h-full flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-[#006D5B]/10">
                <div className="flex items-center gap-3">
                  <img src="/logo2.png" alt="Logo" className="h-12 w-12" />
                  <div>
                    <span
                      className="text-lg font-normal tracking-wide text-[#006D5B]"
                      style={{ letterSpacing: "0.08em" }}
                    >
                      OrthoChronicles
                    </span>
                    <span
                      className="text-sm font-light block text-slate-500"
                      style={{
                        letterSpacing: "0.1em",
                        marginTop: "-4px",
                      }}
                    >
                      From Braces To Breakthroughs
                    </span>
                  </div>
                </div>
                <button
                  className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#006D5B]"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="#006D5B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="#006D5B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col items-center justify-center h-full gap-6 -mt-16">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-2xl text-[#005c4d] hover:text-[#004B3F] transition-colors duration-300"
                    style={{ fontFamily: MENU_FONT }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="mt-6 flex items-center justify-center text-white text-lg font-medium w-4/5 max-w-xs py-4 bg-[#006D5B] rounded-full shadow-lg hover:bg-[#005c4d] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
