import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
  ClockIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  LockClosedIcon,
  SparklesIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import AuthModal from "../components/AuthModal";

// NEW: Component-based content rendering
const renderContent = (block) => {
  switch (block.type) {
    case "heading":
      return (
        <h2
          key={block.id}
          className="text-3xl font-bold text-[#005c4d] mt-12 mb-6"
        >
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          key={block.id}
          className="text-lg text-[#fbbaba] leading-relaxed mb-6"
        >
          {block.text}
        </p>
      );
    case "image":
      return (
        <div key={block.id} className="my-10">
          <img
            src={block.src}
            alt={block.caption}
            className="rounded-2xl shadow-lg w-full object-cover"
          />
          {block.caption && (
            <p className="text-center text-sm text-gray-500 mt-3 italic">
              {block.caption}
            </p>
          )}
        </div>
      );
    case "quote":
      return (
        <blockquote
          key={block.id}
          className="border-l-4 border-[#006D5B] pl-8 py-6 my-10 bg-[#DCE6D5]/40 rounded-r-2xl"
        >
          <p className="text-xl italic text-[#4B4B4B] mb-4">"{block.text}"</p>
          {block.cite && (
            <cite className="text-[#006D5B] font-semibold not-italic">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case "note":
      return (
        <div
          key={block.id}
          className="bg-[#DCE6D5]/40 p-8 rounded-2xl border-l-4 border-[#006D5B] my-10"
        >
          <h3 className="text-2xl font-bold text-[#005c4d] mb-4 flex items-center">
            <SparklesIcon className="w-6 h-6 text-[#006D5B] mr-3" />
            {block.title}
          </h3>
          <p className="text-lg text-[#4B4B4B] mb-4">{block.text}</p>
          {block.points && (
            <div className="bg-white/70 p-6 rounded-xl mt-6">
              <ul className="space-y-3">
                {block.points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-[#006D5B] mr-3 mt-1 flex-shrink-0" />
                    <span
                      className="text-[#4B4B4B]"
                      dangerouslySetInnerHTML={{ __html: point }}
                    ></span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    case "challenge":
      return (
        <div
          key={block.id}
          className="bg-yellow-50 p-8 rounded-2xl border border-yellow-200 my-10"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {block.title}
          </h2>
          <p className="text-lg text-gray-700 mb-6">{block.text}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {block.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-800">
                    {index + 1}
                  </span>
                </div>
                <h4 className="font-bold mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

// NEW: Dummy data for related articles
const relatedArticles = [
  {
    id: 2,
    title: "The Biomechanics of Tooth Movement",
    category: "Fundamentals",
    heroImage: "/article1.jpg",
  },
  {
    id: 3,
    title: "Modern Bracket Systems Compared",
    category: "Clinical Tech",
    heroImage: "/article2.jpg",
  },
  {
    id: 4,
    title: "Managing Orthodontic Emergencies",
    category: "Patient Care",
    heroImage: "/article3.jpg",
  },
];

// NEW: Related Reads Component
const RelatedReads = () => (
  <div className="mt-16 pt-12 border-t border-[#006D5B]/10">
    <h2 className="text-3xl font-bold text-[#005c4d] mb-8 text-center">
      Related Reads
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {relatedArticles.map((article) => (
        <Link
          to={`/article/${article.id}`}
          key={article.id}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div className="overflow-hidden">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <span className="text-sm font-semibold text-[#006D5B]">
              {article.category}
            </span>
            <h3 className="mt-2 text-lg font-bold text-[#4B4B4B] group-hover:text-[#005c4d] transition-colors">
              {article.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

// DEMO ARTICLE DATA - RESTRUCTURED
const demoArticle = {
  id: 1,
  title: "The Secret to Mastering Cephalometric Analysis",
  subtitle: "What they don't teach you in textbooks",
  author: "Dr. Shravani",
  authorImage: "/user.jpeg",
  authorBio:
    "Lead Orthodontist with 15+ years experience, Former Harvard Faculty",
  publishDate: "2025-01-15",
  readTime: 12,
  views: 15420,
  likes: 1240,
  heroImage: "/demo.png",
  category: "Advanced Techniques",
  difficulty: "Intermediate",
  tags: ["Cephalometrics", "X-Ray Analysis", "Clinical Skills", "Diagnosis"],

  // OLD content properties removed
  // NEW structured content array
  content: [
    {
      id: "p1",
      type: "paragraph",
      text: "Every orthodontic resident faces the same nightmare: staring at a cephalometric X-ray for what feels like hours, trying to identify landmarks that seem to vanish the moment you think you've found them.",
    },
    {
      id: "p2",
      type: "paragraph",
      text: "I remember my first week of residency when Dr. Martinez handed me a lateral ceph and asked me to identify the ANB angle. I spent 45 minutes on what should have been a 2-minute task. The patient was waiting, my confidence was shattered, and I felt like I'd never master this essential skill.",
    },
    {
      id: "p3",
      type: "paragraph",
      text: "But here's what changed everything for me—and what I wish someone had told me on day one...",
    },
  ],

  fullContent: [
    {
      id: "note1",
      type: "note",
      title: 'The "Landmark Map" Technique',
      text: 'Instead of hunting for individual landmarks, successful orthodontists use what I call the "Landmark Map" technique. They create a mental grid system that makes every landmark predictable.',
      points: [
        "<strong>Zone 1 (Cranial):</strong> Start with Sella and Nasion - they're your north star.",
        '<strong>Zone 2 (Maxillary):</strong> A-point becomes obvious once you know the "shadow trick".',
        "<strong>Zone 3 (Mandibular):</strong> B-point and Pogonion follow a predictable curve.",
      ],
    },
    {
      id: "img1",
      type: "image",
      src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop",
      caption: "Systematic analysis leads to greater accuracy.",
    },
    { id: "h1", type: "heading", text: "Why This Works" },
    {
      id: "p4",
      type: "paragraph",
      text: "The human brain is wired for pattern recognition, not random searching. When you approach cephs systematically, you're working with your neural pathways, not against them. Studies show that orthodontists using systematic approaches are 340% faster and 67% more accurate in their measurements.",
    },
    {
      id: "q1",
      type: "quote",
      text: "The difference between a struggling resident and a confident orthodontist isn't talent—it's having the right system.",
      cite: "Dr. Robert Ricketts, Pioneer of Cephalometric Analysis",
    },
    {
      id: "challenge1",
      type: "challenge",
      title: "The 5-Minute Ceph Challenge",
      text: "Here's a practical exercise that will revolutionize your ceph reading skills:",
      steps: [
        {
          title: "Minute 1-2",
          description: "Orient the film and identify the three zones",
        },
        {
          title: "Minute 3-4",
          description: "Mark landmarks using the map technique",
        },
        {
          title: "Minute 5",
          description: "Calculate key angles and verify measurements",
        },
      ],
    },
  ],

  comments: [
    {
      id: 1,
      author: "Sarah M.",
      authorImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b762?w=400&h=400&fit=crop&crop=face",
      content:
        "This completely changed how I approach ceph analysis! Went from 30 minutes per case to 8 minutes. Thank you Dr. Shravani!",
      date: "2 days ago",
      likes: 24,
      isStudent: true,
    },
    {
      id: 2,
      author: "Dr. James Park",
      authorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      content:
        "I've been practicing for 10 years and still learned something new. The zone system is brilliant.",
      date: "1 week ago",
      likes: 18,
      isStudent: false,
    },
    {
      id: 3,
      author: "Emily R.",
      authorImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      content:
        "Just passed my boards using these techniques! The 5-minute challenge was a game changer.",
      date: "2 weeks ago",
      likes: 31,
      isStudent: true,
    },
  ],
};

// Subscription Gate Component
const SubscriptionGate = ({ onSubscribe }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white z-10 pointer-events-none"></div>

      <div className="relative z-20 bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center mt-8">
        <div className="max-w-md mx-auto">
          <LockClosedIcon className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-[#005c4d] mb-4">
            Want to Read the Full Article?
          </h3>
          <p className="text-[#4B4B4B] mb-6">
            Join 15,000+ dental students who are mastering orthodontics with our
            expert guides, case studies, and exclusive content.
          </p>

          <div className="bg-[#DCE6D5]/50 p-6 rounded-xl mb-6">
            <h4 className="font-semibold text-[#005c4d] mb-3">
              🎁 Free Membership Includes:
            </h4>
            <ul className="text-sm text-[#4B4B4B] space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-[#006D5B]" /> Complete
                access to 200+ in-depth articles
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-[#006D5B]" />{" "}
                Downloadable study guides and worksheets
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-[#006D5B]" /> Weekly
                case study discussions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-[#006D5B]" /> Direct
                Q&A with Dr. Shravani
              </li>
            </ul>
          </div>

          <button
            onClick={onSubscribe}
            className="w-full bg-[#006D5B] text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-[#005c4d] transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Free Access Now
          </button>

          <p className="text-xs text-gray-500 mt-4">
            No credit card required • Unsubscribe anytime
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Reading Progress Component
const ReadingProgress = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = () => {
    if (!target.current) return;

    const element = target.current;
    const totalHeight = element.clientHeight - window.innerHeight;
    const windowScrollTop = window.pageYOffset;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  return (
    <div
      style={{ width: `${readingProgress}%` }}
      className="fixed top-0 left-0 z-50 h-1 bg-[#006D5B] transition-all duration-100"
    />
  );
};

// Comment Component
const CommentSection = ({ comments }) => {
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="mt-12 border-t border-[#006D5B]/10 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#005c4d] flex items-center">
          <ChatBubbleLeftIcon className="w-6 h-6 mr-2 text-[#006D5B]" />
          Comments ({comments.length})
        </h3>
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-[#006D5B] hover:text-[#005c4d] font-medium"
        >
          {showComments ? "Hide" : "Show"} Comments
        </button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            {/* Comment Input */}
            <div className="bg-[#DCE6D5]/40 p-4 rounded-xl">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts or questions..."
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D5B] focus:border-transparent resize-none"
                rows="3"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-[#4B4B4B]">
                  Join the discussion
                </span>
                <button className="bg-[#006D5B] text-white px-6 py-2 rounded-lg hover:bg-[#005c4d] transition-colors">
                  Post Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <img
                    src={comment.authorImage}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-[#4B4B4B]">
                        {comment.author}
                      </span>
                      {comment.isStudent && (
                        <span className="bg-[#DCE6D5] text-[#006D5B] px-2 py-1 rounded-full text-xs font-medium">
                          Student
                        </span>
                      )}
                      <span className="text-gray-500 text-sm">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-[#4B4B4B] mb-2">{comment.content}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                        <HeartIcon className="w-4 h-4" />
                        {comment.likes}
                      </button>
                      <button className="text-gray-500 hover:text-[#006D5B] transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Component
export default function ArticleTemplate() {
  const { id } = useParams();
  const targetRef = useRef();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const article = demoArticle;

  const handleSubscribe = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setIsSubscribed(true);
    setShowAuthModal(false);
  };

  return (
    <div ref={targetRef} className="bg-[#F9F9F9] min-h-screen">
      <ReadingProgress target={targetRef} />
      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Left/Right Navigation Arrows */}
      <div className="fixed top-1/2 -translate-y-1/2 left-4 z-30 hidden lg:block">
        <Link
          to="/article/prev"
          className="bg-white/60 p-3 rounded-full shadow-md hover:bg-white backdrop-blur-sm transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6 text-[#006D5B]" />
        </Link>
      </div>
      <div className="fixed top-1/2 -translate-y-1/2 right-4 z-30 hidden lg:block">
        <Link
          to="/article/next"
          className="bg-white/60 p-3 rounded-full shadow-md hover:bg-white backdrop-blur-sm transition-colors"
        >
          <ChevronRightIcon className="w-6 h-6 text-[#006D5B]" />
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto px-4 py-8 md:py-12"
      >
        {/* Header Navigation */}
        <div className="mb-8">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-[#4B4B4B] hover:text-[#006D5B] transition-colors group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-[#006D5B] text-white px-4 py-2 rounded-full text-sm font-semibold">
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-[#4B4B4B]">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                {article.difficulty}
              </span>
              <span className="flex items-center gap-1">
                <EyeIcon className="w-4 h-4" />
                {article.views.toLocaleString()} views
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#005c4d] leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-xl text-[#4B4B4B]/80 mb-8 leading-relaxed">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-6 bg-white p-4 rounded-2xl border border-[#006D5B]/10">
            <div className="flex items-center gap-4">
              <img
                src={article.authorImage}
                alt={article.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-[#005c4d]">
                  {article.author}
                </div>
                <div className="text-sm text-[#4B4B4B]">
                  {article.authorBio}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-[#4B4B4B]">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                {article.readTime} min read
              </div>
              <span>{article.publishDate}</span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="aspect-[16/9] rounded-2xl overflow-hidden shadow-lg mb-12"
        >
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <article className="prose-lg max-w-none">
          {/* Preview Content (always visible) */}
          {article.content.map((block) => renderContent(block))}

          {/* Full Content (behind subscription gate) */}
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {article.fullContent.map((block) => renderContent(block))}
            </motion.div>
          ) : (
            <SubscriptionGate onSubscribe={handleSubscribe} />
          )}
        </article>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#006D5B]/10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                liked
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {liked ? (
                <HeartSolidIcon className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              {article.likes + (liked ? 1 : 0)}
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-full transition-colors ${
                bookmarked
                  ? "bg-[#DCE6D5] text-[#006D5B]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <BookmarkIcon className="w-5 h-5" />
            </button>

            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-[#DCE6D5] text-[#006D5B] font-medium hover:bg-[#c9d4c4] cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        {isSubscribed && <CommentSection comments={article.comments} />}

        {/* Author Bio */}
        <div className="mt-12 p-8 bg-white rounded-2xl border border-[#006D5B]/10">
          <div className="flex items-start gap-6">
            <img
              src={article.authorImage}
              alt={article.author}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#005c4d] mb-2">
                About {article.author}
              </h3>
              <p className="text-[#4B4B4B] mb-4">
                Dr. Shravani is a leading orthodontist with over 15 years of
                clinical experience. She has trained thousands of dental
                students and residents, and her innovative teaching methods have
                transformed how orthodontics is taught globally.
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-[#006D5B] text-white px-6 py-2 rounded-lg hover:bg-[#005c4d] transition-colors">
                  Follow Dr. Shravani
                </button>
                <span className="text-sm text-gray-600">15,420 followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Reads Section */}
        <RelatedReads />
      </motion.div>
    </div>
  );
}
