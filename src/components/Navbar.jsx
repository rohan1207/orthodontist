import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    {
      name: "Categories",
      href: "#categories",
      hasDropdown: true,
      dropdown: [
        "Orthodontics",
        "DIY Solutions",
        "Listicles",
        "Videos",
        "Podcasts",
        "Articles",
      ],
    },
    { name: "Credible Sources", href: "#sources" },
    { name: "Actionable Solutions", href: "#solutions" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                isScrolled ? "bg-teal-500" : "bg-white/20 backdrop-blur-sm"
              }`}
            >
              <span className="text-white font-bold text-lg">OD</span>
            </div>
            <span
              className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              OrthoDentist Blog
            </span>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative">
                <motion.a
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`flex items-center space-x-1 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "text-gray-700 hover:text-teal-600"
                      : "text-white/90 hover:text-white"
                  }`}
                  onMouseEnter={() =>
                    item.hasDropdown && setIsResourcesOpen(true)
                  }
                  onMouseLeave={() =>
                    item.hasDropdown && setIsResourcesOpen(false)
                  }
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isResourcesOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </motion.a>

                {/* Dropdown for Resources */}
                {item.hasDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{
                      opacity: isResourcesOpen ? 1 : 0,
                      y: isResourcesOpen ? 0 : -10,
                      scale: isResourcesOpen ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden ${
                      isResourcesOpen
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                    }`}
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                  >
                    {item.dropdown?.map((dropdownItem, idx) => (
                      <motion.a
                        key={dropdownItem}
                        href={`#${dropdownItem
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        whileHover={{ backgroundColor: "#f0fdfa" }}
                        className="block px-6 py-3 text-sm text-gray-700 hover:text-teal-600 transition-colors duration-200"
                      >
                        {dropdownItem}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              isScrolled
                ? "bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl"
                : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
            }`}
          >
            Subscribe
          </motion.button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
