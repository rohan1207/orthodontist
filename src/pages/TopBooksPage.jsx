import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  Squares2X2Icon,
  Bars3BottomLeftIcon,
  FunnelIcon,
  ArrowRightIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

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

// Master list of books (can be sourced from API later)
const BOOKS = [
  {
    id: 1,
    title: "Handbook of  Orthodontics",
    author: "William R. Proffit",
    description:
      "The definitive guide covering diagnosis, treatment planning, and mechanics. A must-have for every orthodontic resident.",
    coverImage: "/book1.webp",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["Diagnosis", "Treatment Planning", "Mechanics"],
  },
  {
    id: 2,
    title: "Handbook of Orthodontics",
    author: "Robert E. Moyers",
    description:
      "A foundational text focusing on growth and development, and the biological basis of orthodontic treatment.",
    coverImage: "/book2.jpg",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["Growth & Development", "Biology"],
  },
  {
    id: 3,
    title: "Orthodontics: Current Principles and Techniques",
    author: "Lee W. Graber",
    description:
      "An in-depth resource on advanced techniques, new technologies, and evidence-based practices in the field.",
    coverImage: "/book3.jpeg",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["Advanced Techniques", "Evidence-based"],
  },
  {
    id: 4,
    title: "Systemized Orthodontic Treatment Mechanics",
    author: "R. G. 'Wick' Alexander",
    description:
      "A practical guide to applying the Alexander Discipline, focusing on efficient and predictable treatment mechanics.",
    coverImage: "/book4.jpeg",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["Alexander Discipline", "Mechanics"],
  },
  // Additional entries (placeholders to populate the page)
  {
    id: 5,
    title: "Biomechanics in Orthodontics",
    author: "Charles J. Burstone",
    description:
      "Core principles of force systems, anchorage, and controlled tooth movement explained with clarity.",
    coverImage: "/book1.webp",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["Force Systems", "Anchorage"],
  },
  {
    id: 6,
    title: "Cephalometrics in Orthodontics",
    author: "William B. Downs",
    description:
      "A friendly walkthrough of cephalometric landmarks, analyses, and interpretation for clinicians.",
    coverImage: "/book2.jpg",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["Cephalometrics", "Analysis"],
  },
  {
    id: 7,
    title: "Contemporary Orthodontics",
    author: "William R. Proffit",
    description:
      "Widely used modern text blending fundamentals with clinical applications and evidence-based updates.",
    coverImage: "/book3.jpeg",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["Fundamentals", "Clinical"],
  },
  {
    id: 8,
    title: "Orthodontic Diagnosis and Planning",
    author: "Ravindra Nanda",
    description:
      "Structured approaches to diagnostic synthesis and treatment planning across various malocclusions.",
    coverImage: "/book4.jpeg",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["Diagnosis", "Planning"],
  },
  {
    id: 9,
    title: "Essentials of Facial Growth",
    author: "Donald H. Enlow",
    description:
      "Understanding craniofacial growth patterns and their implications for orthodontic interventions.",
    coverImage: "/book1.webp",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["Craniofacial Growth"],
  },
  {
    id: 10,
    title: "Advanced Anchorage Concepts",
    author: "Pancherz & Sugawara",
    description:
      "Mini-implants and biomechanics strategies to achieve reliable anchorage and treatment efficiency.",
    coverImage: "/book2.jpg",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["TADs", "Anchorage"],
  },
  {
    id: 11,
    title: "Aligner Orthodontics Handbook",
    author: "Tarek El-Bialy",
    description:
      "Digital planning, staging, and clinical protocols for effective clear aligner treatments.",
    coverImage: "/book3.jpeg",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["Aligners", "Digital Planning"],
  },
  {
    id: 12,
    title: "Fixed Appliance Therapy – A Practical Guide",
    author: "P. S. Fleming",
    description:
      "Step-by-step brackets to finishing protocols, with practical tips for everyday clinical use.",
    coverImage: "/book4.jpeg",
    buyLink: "#",
    ebookLink: "",
    recommendedFor: ["Fixed Appliances", "Finishing"],
  },
];

const SORTS = [
  { id: "title-asc", label: "Title A → Z" },
  { id: "title-desc", label: "Title Z → A" },
  { id: "author-asc", label: "Author A → Z" },
  { id: "author-desc", label: "Author Z → A" },
];

function TopicChips({ items = [] }) {
  const trimmed = items.slice(0, 3);
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {trimmed.map((t, i) => (
        <span
          key={i}
          className="px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700 border border-green-200"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Actions({ book }) {
  const hasEbook = book.ebookLink && book.ebookLink.length > 0;
  const hasBuy = book.buyLink && book.buyLink.length > 0;
  return (
    <div className="mt-auto flex gap-2">
      {hasEbook ? (
        <a
          href={book.ebookLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 text-sm font-medium hover:opacity-95"
        >
          Open eBook
        </a>
      ) : (
        <Link
          to={`/book-summary/${book.id}`}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 text-sm font-medium hover:opacity-95"
        >
          Read Summary
        </Link>
      )}
      {hasBuy && (
        <a
          href={book.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white text-sm font-medium hover:bg-gray-50"
        >
          Buy
        </a>
      )}
    </div>
  );
}

function FlipBookCard({ book }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((v) => !v);

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
      onClick={toggle}
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

        {/* Right Pages Stack */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[15px] bg-white shadow-inner transform-gpu"
          style={{
            transformOrigin: "right",
            transform: "rotateY(-20deg) translateX(15px)",
            background: "linear-gradient(to left, #e5e7eb 0%, #fff 100%)",
          }}
        />

        {/* Inner Pages */}
        <motion.div
          className="absolute w-full h-full bg-white rounded-r-lg overflow-hidden"
          variants={{
            open: { opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
            closed: { opacity: 0, transition: { duration: 0.2 } },
          }}
        >
          <div className="h-full flex flex-col p-5 md:p-6 bg-gradient-to-r from-white to-gray-50">
            <div className="flex-1 min-h-0">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {book.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">by {book.author}</p>
              <div className="w-14 h-0.5 bg-green-500 my-3" />
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                {book.description}
              </p>
              <TopicChips items={book.recommendedFor} />
            </div>
            <Actions book={book} />
          </div>
        </motion.div>

        {/* Book Cover */}
        <motion.div
          className="absolute w-full h-full rounded-lg shadow-2xl overflow-hidden"
          style={{ transformOrigin: "left", transformStyle: "preserve-3d" }}
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
              transition: { type: "spring", stiffness: 60, damping: 15 },
            },
          }}
        >
          {/* Front Cover */}
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
              variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
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

      {/* Environmental shadow */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%)",
          width: "100%",
          height: "20px",
          transform: "rotateX(60deg)",
        }}
        variants={{
          open: { width: "90%", opacity: 0.3 },
          closed: { width: "100%", opacity: 0.2 },
        }}
      />
    </motion.div>
  );
}

function ListCard({ book }) {
  return (
    <motion.div
      className="w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
        <div className="relative h-44 md:h-full">
          <SafeImage
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 flex flex-col">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500">{book.author}</p>
          <p className="mt-3 text-sm md:text-base text-gray-600 line-clamp-3">
            {book.description}
          </p>
          <TopicChips items={book.recommendedFor} />
          <div className="mt-4 flex gap-2">
            {/* Primary */}
            {book.ebookLink ? (
              <a
                href={book.ebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 text-sm font-medium"
              >
                Open eBook
              </a>
            ) : (
              <Link
                to={`/book-summary/${book.id}`}
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                Read Summary <ArrowRightIcon className="w-4 h-4" />
              </Link>
            )}
            {/* Secondary */}
            {book.buyLink && (
              <a
                href={book.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50"
              >
                Buy
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TopBooksPage() {
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("All");
  const [sortBy, setSortBy] = useState("title-asc");
  const [visible, setVisible] = useState(12);

  const authors = useMemo(
    () => ["All", ...Array.from(new Set(BOOKS.map((b) => b.author))).sort()],
    []
  );

  const filtered = useMemo(() => {
    let list = [...BOOKS];

    if (author !== "All") {
      list = list.filter((b) => b.author === author);
    }

    const searchTerms = query.trim().toLowerCase().split(/\s+/);
    if (searchTerms[0]) {
      list = list.filter((book) => {
        const content = `${book.title} ${book.author} ${book.description} ${book.recommendedFor.join(" ")}`.toLowerCase();
        return searchTerms.every(term => content.includes(term));
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
  }, [query, author, sortBy]);

  const visibleList = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  const resetFilters = () => {
    setQuery("");
    setAuthor("All");
    setSortBy("title-asc");
    setVisible(12);
  };

  return (
    <div className="py-16 md:py-24 bg-[#DCE6D5]/30">
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
            Explore our curated library of essential orthodontic literature. Find your next read with powerful search and filtering tools.
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
              {authors.map((a) => <option key={a} value={a}>{a === 'All' ? 'All Authors' : a}</option>)}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-[#006D5B]/20 bg-white text-[#4B4B4B] focus:outline-none focus:ring-2 focus:ring-[#006D5B]/20 w-full sm:w-auto"
            >
              {SORTS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
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
          Showing <span className="font-semibold text-[#006D5B]">{filtered.length}</span> of {BOOKS.length} books
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
                key={book.id}
                className="relative w-full"
                style={{ minHeight: "450px" }}
              >
                <FlipBookCard book={book} />
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
            <h3 className="text-xl font-semibold text-[#006D5B] mb-2">No Books Found</h3>
            <p className="text-[#4B4B4B] max-w-md mx-auto">
              Your search returned no results. Try adjusting your keywords or resetting the filters.
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
