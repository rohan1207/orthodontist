import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Import font (e.g., 'Inter', 'Montserrat', or 'Helvetica Neue')
const fontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap";
if (typeof window !== "undefined") {
  const link = document.createElement("link");
  link.href = fontUrl;
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

const NAV_FONT = "Inter, Helvetica Neue, Arial, sans-serif";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blog" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 shadow-sm border-b border-gray-200"
            : "bg-transparent"
        }`}
        style={{ fontFamily: NAV_FONT }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-gray-900 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <path d="M8 8h8v8H8z" />
              </svg>
            </div>
            <Link to="/">
              <span
                className="text-lg font-normal tracking-wide"
                style={{ letterSpacing: "0.08em" }}
              >
                OrthoEdge
              </span>
            </Link>
          </div>
          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-6">
            <button
              className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full border border-gray-900 bg-white hover:bg-gray-50 transition-all text-base font-normal"
              style={{ fontFamily: NAV_FONT }}
            >
              <Link to="/blog" className="flex items-center gap-2">
                <span className="text-xl font-bold">+</span> Read Our Blogs
              </Link>
            </button>
            <button
              className="p-2 rounded focus:outline-none"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                width="32"
                height="32"
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
      {/* Elegant Popup Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-full z-[60] bg-white/95 backdrop-blur-lg"
            style={{ fontFamily: NAV_FONT }}
          >
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center h-full gap-6">
              {menuItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.06, x: 8 }}
                  className="text-3xl md:text-4xl font-normal text-gray-900 px-6 py-2 rounded transition-all duration-200"
                  style={{ letterSpacing: "0.04em" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <button
                className="absolute top-8 right-8 p-2"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
