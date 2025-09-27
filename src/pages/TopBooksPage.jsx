import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { BookOpenIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { buildApiUrl } from "../utils/api";


// Safe image with fallback to avoid broken covers
function SafeImage({ src, alt, className }) {
  const [img, setImg] = useState(src);
  const fallback = "https://placehold.co/640x900?text=Book+Cover";
  return (
    <img
      src={img}
      alt={alt}
      loading="lazy"
      onError={() => img !== fallback && setImg(fallback)}
      className={className}
    />
  );
}


const SORTS = [
  { id: "title-asc", label: "Title A → Z" },
  { id: "title-desc", label: "Title Z → A" },
  { id: "author-asc", label: "Author A → Z" },
  { id: "author-desc", label: "Author Z → A" },
];

const BookCard = ({ book, isOpen, onToggle }) => {
  return (
    <motion.div
      className="relative w-full cursor-pointer "
      style={{
        perspective: "2000px",
        aspectRatio: "3/4",
      }}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      onClick={onToggle}
      onHoverStart={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          onToggle();
        }
      }}
      onHoverEnd={() => {
        if (window.matchMedia("(hover: hover)").matches) {
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
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#006D5B] line-clamp-2">
                {book.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#4B4B4B]/80">
                by {book.author}
              </p>
              <div className="w-12 h-0.5 bg-[#006D5B] my-2 sm:my-3 opacity-50"></div>
              
              {/* Description */}
              <p className="text-[#4B4B4B] text-xs sm:text-sm leading-relaxed mb-3">
                {book.description}
              </p>
              
              {/* Tags */}
              {book.tags && book.tags.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-[#006D5B] mb-1">Recommended For:</h4>
                  <div className="flex flex-wrap gap-1">
                    {book.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#DCE6D5] text-[#006D5B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-auto pt-2">
              {/* E-book Link */}
              {book.ebookLink && (
                <a
                  href={book.ebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#F3F7F4] text-[#006D5B] text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-[#E0ECE6] hover:shadow-lg hover:-translate-y-0.5 border border-[#006D5B]/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BookOpenIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Read E-book</span>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-auto opacity-70" />
                </a>
              )}
              
              {/* Purchase / Buy Link */}
              {book.buyLink ? (
                <a
                  href={book.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#006D5B] text-white text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-[#004B3F] hover:shadow-lg hover:-translate-y-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Buy Now</span>
                  </div>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 sm:w-4 sm:h-4 opacity-80" />
                </a>
              ) : (
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + book.author + ' buy')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#F3F7F4] text-[#006D5B] text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-[#E0ECE6] hover:shadow-lg hover:-translate-y-0.5 border border-[#006D5B]/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Find where to buy</span>
                  </div>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 sm:w-4 sm:h-4 opacity-70" />
                </a>
              )}
            </div>
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
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(1px)",
            }}
          >
            <SafeImage
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover rounded-lg"
            />
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



const BookCardInner = ({ book, isOpen, onToggle }) => {
  return (
    <motion.div
      className="relative w-full cursor-pointer "
      style={{
        perspective: "2000px",
        aspectRatio: "3/4",
      }}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      onClick={onToggle}
      onHoverStart={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          onToggle();
        }
      }}
      onHoverEnd={() => {
        if (window.matchMedia("(hover: hover)").matches) {
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
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#006D5B] line-clamp-2">
                {book.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#4B4B4B]/80">
                by {book.author}
              </p>
              <div className="w-12 h-0.5 bg-[#006D5B] my-2 sm:my-3 opacity-50"></div>
              
              {/* Description */}
              <p className="text-[#4B4B4B] text-xs sm:text-sm leading-relaxed mb-3">
                {book.description}
              </p>
              
              {/* Tags */}
              {book.tags && book.tags.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-[#006D5B] mb-1">Recommended For:</h4>
                  <div className="flex flex-wrap gap-1">
                    {book.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#DCE6D5] text-[#006D5B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-auto pt-2">
              {/* E-book Link */}
              {book.ebookLink && (
                <a
                  href={book.ebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#F3F7F4] text-[#006D5B] text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-[#E0ECE6] hover:shadow-lg hover:-translate-y-0.5 border border-[#006D5B]/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BookOpenIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Read E-book</span>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-auto opacity-70" />
                </a>
              )}
              
              {/* Purchase / Buy Link */}
              {book.buyLink ? (
                <a
                  href={book.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#006D5B] text-white text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-[#004B3F] hover:shadow-lg hover:-translate-y-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Buy Now</span>
                  </div>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 sm:w-4 sm:h-4 opacity-80" />
                </a>
              ) : (
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + book.author + ' buy')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#F3F7F4] text-[#006D5B] text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-[#E0ECE6] hover:shadow-lg hover:-translate-y-0.5 border border-[#006D5B]/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Find where to buy</span>
                  </div>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 sm:w-4 sm:h-4 opacity-70" />
                </a>
              )}
            </div>
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
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(1px)",
            }}
          >
            <SafeImage
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover rounded-lg"
            />
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

export default function TopBooksPage() {
  const handleToggle = (bookId) => {
    setOpenBookId((prevId) => (prevId === bookId ? null : bookId));
  };
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("All");
  const [sortBy, setSortBy] = useState("title-asc");
  const [visible, setVisible] = useState(12);
  const [books, setBooks] = useState([]);
  const [openBookId, setOpenBookId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(buildApiUrl('/api/books'));
        const list = Array.isArray(res.data) ? res.data : [];
        // sort by order if present
        list.sort((a, b) => (a.order || 0) - (b.order || 0));
        setBooks(list);
      } catch (err) {
        console.error('Failed to load books:', err);
        setError('Failed to load books.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const authors = useMemo(
    () => ["All", ...Array.from(new Set((books || []).map((b) => b.author))).sort()],
    [books]
  );

  const filtered = useMemo(() => {
    let list = [...books];

    if (author !== "All") {
      list = list.filter((b) => b.author === author);
    }

    const searchTerms = query.trim().toLowerCase().split(/\s+/);
    if (searchTerms[0]) {
      list = list.filter((book) => {
        const content = `${book.title} ${book.author} ${
          book.description
        } ${(book.tags || []).join(" ")}`.toLowerCase();
        return searchTerms.every((term) => content.includes(term));
      });
    }

    switch (sortBy) {
      case "title-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "author-asc":
        list.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "author-desc":
        list.sort((a, b) => b.author.localeCompare(a.author));
        break;
      default:
        break;
    }

    return list;
  }, [books, query, author, sortBy]);

  const visibleList = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  if (loading) {
    return (
      <div className="py-16 md:py-24 bg-[#DCE6D5]/30 mt-8 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006D5B] mx-auto mb-4"></div>
          <p className="text-[#4B4B4B]">Loading recommended books...</p>
        </div>
      </div>
    );
  }

  const resetFilters = () => {
    setQuery("");
    setAuthor("All");
    setSortBy("title-asc");
    setVisible(12);
  };

  return (
    <div className="py-16 md:py-24 bg-[#DCE6D5]/30 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#006D5B] mb-6 flex items-center justify-center gap-3"
          >
            <BookOpenIcon className="w-10 h-10" /> Recommended Books
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-[#4B4B4B]"
          >
            Explore our curated library of essential orthodontic literature.
            Find your next read with powerful search and filtering tools.
          </motion.p>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          {/* Search Bar */}
          <div className="relative max-w-3xl mx-auto mb-6">
            <MagnifyingGlassIcon className="w-6 h-6 text-[#006D5B] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, or topic (e.g., 'Proffit biomechanics')..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#006D5B]/20 bg-white text-[#4B4B4B] placeholder-[#4B4B4B]/60 focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20 shadow-sm"
            />
          </div>

          {/* Filter/Sort Dropdowns */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <select
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-[#006D5B]/20 bg-white text-[#4B4B4B] focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20 w-full sm:w-auto"
            >
              {authors.map((a) => (
                <option key={a} value={a}>
                  {a === "All" ? "All Authors" : a}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-[#006D5B]/20 bg-white text-[#4B4B4B] focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20 w-full sm:w-auto"
            >
              {SORTS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>

            <button
              onClick={resetFilters}
              className="px-4 py-2.5 rounded-lg border border-[#006D5B]/20 bg-white text-[#4B4B4B] hover:bg-[#006D5B]/5 transition-colors w-full sm:w-auto"
            >
              Reset
            </button>
          </div>
        </motion.div>

        {/* Result count */}
        <div className="mb-8 text-center sm:text-left text-[#4B4B4B]">
          Showing{" "}
          <span className="font-semibold text-[#006D5B]">
            {filtered.length}
          </span>{" "}
          of {books.length} books
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16"
          >
            {visibleList.map((book) => (
              <div
                key={book._id || book.id}
                className="relative w-full min-h-[280px] sm:min-h-[360px] md:min-h-[440px]"
              >
                <BookCard
                  book={book}
                  isOpen={openBookId === (book._id || book.id)}
                  onToggle={() => handleToggle(book._id || book.id)}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BookOpenIcon className="w-24 h-24 mx-auto text-[#006D5B]/20 mb-4" />
            <h3 className="text-xl font-semibold text-[#006D5B] mb-2">
              No Books Found
            </h3>
            <p className="text-[#4B4B4B] max-w-md mx-auto">
              Your search returned no results. Try adjusting your keywords or
              resetting the filters.
            </p>
          </motion.div>
        )}

        {/* Load more */}
        {canLoadMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => setVisible((v) => v + 8)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#006D5B] text-white font-medium hover:bg-[#005c4d] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Load More Books
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
