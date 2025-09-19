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

const BookCard = ({ book }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="relative w-full cursor-pointer"
      style={{
        perspective: "2000px",
        aspectRatio: "3/4",
        containIntrinsicSize: "300px 400px",
      }}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      onHoverStart={() => setIsOpen(true)}
      onHoverEnd={() => setIsOpen(false)}
      onClick={() => setIsOpen((v) => !v)}
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
          className="absolute left-0 top-0 bottom-0 w-[20px] bg-gradient-to-r from-gray-800 to-gray-700"
          style={{
            transformOrigin: "left",
            rotateY: "-90deg",
            translateX: "10px",
          }}
        />

        {/* Right Pages Stack (gives depth) */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[15px] bg-white shadow-inner transform-gpu rounded-tr-md rounded-br-md"
          style={{
            transformOrigin: "right",
            transform: "rotateY(-20deg) translateX(15px)",
            background: "linear-gradient(to left, #e5e7eb 0%, #fff 100%)",
            boxShadow: "inset -1px 0 3px rgba(0,0,0,0.1)",
          }}
        />

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
          <div className="h-full flex flex-col p-6 md:p-8 bg-gradient-to-r from-white to-gray-50">
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                {book.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">by {book.author}</p>
              <div className="w-16 h-0.5 bg-green-500 my-4"></div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {book.description}
              </p>
            </div>
            <Link
              to={`/book-summary/${book.id}`}
              className="group mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Read Book
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Book Cover */}
        <motion.div
          className="absolute w-full h-full rounded-lg shadow-2xl overflow-hidden"
          style={{
            transformOrigin: "left",
            transformStyle: "preserve-3d",
          }}
          variants={{
            open: {
              rotateY: -170,
              transition: {
                type: "spring",
                stiffness: 50,
                damping: 15,
                restDelta: 0.5,
              },
            },
            closed: {
              rotateY: 0,
              transition: {
                type: "spring",
                stiffness: 60,
                damping: 15,
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
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 flex items-center justify-center gap-3">
            <BookOpenIcon className="w-8 h-8 text-green-500" />
            Top Recommended Books
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
            A curated collection of essential textbooks and guides for every
            aspiring orthodontist. Dive into the foundational knowledge that
            shapes modern practice.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-12">
          <div className="contents" style={{ contain: "paint style layout" }}>
            {topBooksData.map((book) => (
              <div
                key={book.id}
                className="relative w-full min-h-[280px] sm:min-h-[360px] md:min-h-[440px] pb-3 md:pb-6"
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
        >
          View All Books
          <svg
            className="w-4 h-4"
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
