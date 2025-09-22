import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpenIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

const topBooksData = [
  {
    id: 1,
    title: "Handbook of  Orthodontics",
    author: "William R. Proffit",
    description:
      "The definitive guide covering diagnosis, treatment planning, and mechanics. A must-have for every orthodontic resident.",
    coverImage: "/book1.webp",
  },
  {
    id: 2,
    title: "Handbook of Orthodontics",
    author: "Robert E. Moyers",
    description:
      "A foundational text focusing on growth and development, and the biological basis of orthodontic treatment.",
    coverImage: "/book2.jpg",
  },
  {
    id: 3,
    title: "Orthodontics: Current Principles and Techniques",
    author: "Lee W. Graber",
    description:
      "An in-depth resource on advanced techniques, new technologies, and evidence-based practices in the field.",
    coverImage: "/book3.jpeg",
  },
  {
    id: 4,
    title: "Systemized Orthodontic Treatment Mechanics",
    author: "R. G. 'Wick' Alexander",
    description:
      "A practical guide to applying the Alexander Discipline, focusing on efficient and predictable treatment mechanics.",
    coverImage: "/book4.jpeg",
  },
];

const BookCard = ({ book, isOpen, onToggle }) => {
  return (
    <motion.div
      className="relative w-full cursor-pointer"
      style={{
        perspective: "2000px",
        aspectRatio: "3/4",
      }}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      onClick={onToggle}
      onHoverStart={() => {
        // Only trigger hover on desktop/laptop devices
        if (window.matchMedia('(hover: hover)').matches) {
          onToggle();
        }
      }}
      onHoverEnd={() => {
        // Only trigger hover on desktop/laptop devices
        if (window.matchMedia('(hover: hover)').matches) {
          onToggle();
        }
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "left",
          willChange: "transform",
          isolation: "isolate",
        }}
      >
        {/* Book Spine */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[20px] bg-gradient-to-r from-[#006D5B] to-[#004B3F]"
          style={{
            transformOrigin: "left",
            rotateY: "-90deg",
            translateX: "10px",
            boxShadow: "inset -2px 0 4px rgba(0,0,0,0.2)",
          }}
        >
          {/* Spine texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "4px 100%",
            }}
          />
        </motion.div>

        {/* Right Pages Stack (gives depth) */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[15px] bg-white shadow-inner transform-gpu rounded-tr-md rounded-br-md"
          style={{
            transformOrigin: "right",
            transform: "rotateY(-20deg) translateX(15px)",
            background: "linear-gradient(to left, #DCE6D5 0%, #fff 100%)",
            boxShadow: "inset -1px 0 3px rgba(0,0,0,0.15)",
          }}
        >
          {/* Page texture */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(0deg, #000 1px, transparent 1px)",
              backgroundSize: "100% 4px",
            }}
          />
        </div>

        {/* Inner Pages */}
        <motion.div
          className="absolute w-full h-full bg-white rounded-r-lg overflow-hidden"
          variants={{
            open: {
              opacity: 1,
              transition: { duration: 0.4, delay: 0.2 },
            },
            closed: {
              opacity: 0,
              transition: { duration: 0.2 },
            },
          }}
        >
          <div className="h-full flex flex-col p-4 sm:p-6 bg-gradient-to-br from-[#DCE6D5]/40 to-white">
            <div className="flex-1 overflow-y-auto">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#006D5B]">
                {book.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#4B4B4B]/80">
                by {book.author}
              </p>
              <div className="w-12 h-0.5 bg-[#006D5B] my-2 sm:my-3 opacity-50"></div>
              <p className="text-[#4B4B4B] text-xs sm:text-sm leading-relaxed">
                {book.description}
              </p>
            </div>
            <Link
              to={`/book-summary/${book.id}`}
              className="group relative mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#006D5B] text-white text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-[#004B3F] hover:shadow-lg hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                Read Book
                <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 rounded-full bg-[#006D5B] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
            </Link>
          </div>
        </motion.div>

        {/* Book Cover */}
        <motion.div
          className="absolute w-full h-full rounded-lg shadow-2xl overflow-hidden"
          style={{
            transformOrigin: "left",
            transformStyle: "preserve-3d",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          }}
          variants={{
            open: {
              rotateY: -170,
              transition: {
                type: "spring",
                stiffness: 45,
                damping: 13,
                restDelta: 0.5,
                duration: 0.8,
              },
            },
            closed: {
              rotateY: 0,
              transition: {
                type: "spring",
                stiffness: 55,
                damping: 13,
                duration: 0.5,
              },
            },
          }}
        >
          {/* Front Cover */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(1px)", // Slight offset to prevent z-fighting
            }}
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Subtle shadow overlay for depth */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 20%)",
                pointerEvents: "none",
              }}
              variants={{
                open: { opacity: 0 },
                closed: { opacity: 1 },
              }}
            />
          </motion.div>

          {/* Inside of Cover */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderLeft: "1px solid rgba(0,0,0,0.1)",
            }}
          />
        </motion.div>
      </div>

      {/* Environmental shadow - positioned relative to parent */}
      <motion.div
        className="absolute -bottom-2 md:-bottom-6 left-1/2 -translate-x-1/2 rounded-full opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%)",
          width: "95%",
          height: "14px",
          transform: "rotateX(60deg)",
        }}
        variants={{
          open: {
            width: "85%",
            opacity: 0.3,
          },
          closed: {
            width: "95%",
            opacity: 0.2,
          },
        }}
      />
    </motion.div>
  );
};

export default function TopBooks() {
  const [openBookId, setOpenBookId] = useState(null);

  const handleToggle = (bookId) => {
    setOpenBookId((prevId) => (prevId === bookId ? null : bookId));
  };

  return (
    <section className="py-16 md:py-24 bg-[#DCE6D5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-[#006D5B] mb-4 flex items-center justify-center gap-3">
            <BookOpenIcon className="w-8 h-8 text-[#006D5B]" />
            Top Recommended Books
          </h2>
          <p className="text-[#4B4B4B] max-w-3xl mx-auto text-base md:text-lg">
            A curated collection of essential textbooks and guides for every
            aspiring orthodontist. Dive into the foundational knowledge that
            shapes modern practice.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-10 md:gap-y-12 lg:gap-x-12">
          {topBooksData.map((book) => (
            <div
              key={book.id}
              className="relative w-full min-h-[280px] sm:min-h-[360px] md:min-h-[440px]"
            >
              <BookCard
                book={book}
                isOpen={openBookId === book.id}
                onToggle={() => handleToggle(book.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 text-center">
        <Link
          to="/top-books"
          className="inline-flex items-center gap-2 px-6 py-2 text-[#006D5B] hover:text-[#004B3F] font-medium transition-colors duration-300 rounded-full border-2 border-[#006D5B]/10 hover:border-[#006D5B]/20 bg-white/50 hover:bg-white/80"
        >
          View All Books
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
