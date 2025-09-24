import React, { useState, useEffect, useRef } from "react";
import { buildApiUrl } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";
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

// Generic component to render sanitized HTML
const RenderHtmlContent = ({ html }) => {
  const sanitizedHtml = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

// Convert plain text into simple HTML: paragraphs, lists, headings, links, and YouTube embeds
function textToHtml(text) {
  if (!text) return "";

  // Helper: detect youtube id and return iframe
  function youtubeEmbed(url) {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/i);
    if (!m) return null;
    const id = m[1];
    return `<div class="video-embed" style="margin:1rem 0"><iframe width=560 height=315 src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe></div>`;
  }

  // Split into blocks separated by one or more blank lines
  const blocks = String(text)
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  const htmlBlocks = blocks.map((block) => {
    const lines = block
      .split(/\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    // Unordered list (lines starting with - or *)
    if (lines.every((l) => /^[-*]\s+/.test(l))) {
      const items = lines
        .map((l) => `<li>${l.replace(/^[-*]\s+/, "")}</li>`)
        .join("");
      return `<ul class="list-disc pl-6 mb-4">${items}</ul>`;
    }

    // Ordered list (lines starting with 1. 2. etc)
    if (lines.every((l) => /^\d+\.\s+/.test(l))) {
      const items = lines
        .map((l) => `<li>${l.replace(/^\d+\.\s+/, "")}</li>`)
        .join("");
      return `<ol class="list-decimal pl-6 mb-4">${items}</ol>`;
    }

    // Single-line headings (ends with ':' or short length)
    if (lines.length === 1 && /:$/.test(lines[0])) {
      return `<h3 class="text-2xl font-semibold text-[#005c4d] mb-3">${lines[0].replace(
        /:$/,
        ""
      )}</h3>`;
    }

    // Convert URLs to links and embed YouTube where possible
    let html = block.replace(/(https?:\/\/[^\s]+)/g, (url) => {
      const embed = youtubeEmbed(url);
      if (embed) return embed;
      return `<a href="${url}" target="_blank" rel="noreferrer" class="text-[#006D5B] underline">${url}</a>`;
    });

    // Preserve single newlines as <br/> for readability
    html = html
      .split(/\n/)
      .map((line) => line.trim())
      .join("<br/>");
    return `<p class="mb-4 text-[#4B4B4B] leading-relaxed">${html}</p>`;
  });

  return htmlBlocks.join("\n");
}

// Related Reads Component (receives relatedArticles prop)
const RelatedReads = ({ relatedArticles = [] }) => {
  return (
    <div className="mt-16 pt-12 border-t border-[#006D5B]/10">
      <h2 className="text-3xl font-bold text-[#005c4d] mb-8 text-center">
        Related Reads
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {relatedArticles.map((article) => (
          <Link
            to={`/article/${article.slug || article.id}`}
            key={article.slug || article.id}
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
};

// Subscription Gate Component (glass card with inline auth)
const SubscriptionGate = ({ onAuthSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Replace with real API calls as needed
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate success and call parent
    onAuthSuccess?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.28 }}
      className="w-full max-w-xl"
    >
      <div className="bg-white/75 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-2xl p-6 sm:p-8">
        {!showForm ? (
          <div className="text-center">
            <LockClosedIcon className="w-14 h-14 text-[#006D5B] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#005c4d] mb-2">
              Unlock the Full Article
            </h3>
            <p className="text-[#4B4B4B] mb-4">
              Join 15,000+ learners mastering orthodontics with expert guides,
              case studies, and weekly discussions.
            </p>

            <div className="bg-[#DCE6D5]/60 p-4 rounded-xl mb-5 text-left">
              <h4 className="font-semibold text-[#005c4d] mb-2">Free includes</h4>
              <ul className="text-sm text-[#4B4B4B] space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-[#006D5B]" /> Access to 200+ in-depth articles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-[#006D5B]" /> Downloadable study guides
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-[#006D5B]" /> Weekly case discussions
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto min-w-[220px] bg-[#006D5B] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#005c4d] transition-colors shadow-lg"
              >
                Sign up / Log in
              </button>
              <span className="text-xs text-gray-500">No card required</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="text-sm text-[#006D5B] hover:text-[#005c4d]"
                onClick={() => setShowForm(false)}
              >
                ← Back
              </button>
              <div className="inline-flex bg-white/70 rounded-full p-1 border border-[#006D5B]/10">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    mode === "login" ? "bg-[#006D5B] text-white" : "text-[#005c4d]"
                  }`}
                  onClick={() => setMode("login")}
                >
                  Log in
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    mode === "signup" ? "bg-[#006D5B] text-white" : "text-[#005c4d]"
                  }`}
                  onClick={() => setMode("signup")}
                >
                  Sign up
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-sm text-[#4B4B4B] mb-1">Full name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                    placeholder="Dr. Jane Doe"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-[#4B4B4B] mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#4B4B4B] mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#006D5B] text-white py-3 rounded-xl font-semibold hover:bg-[#005c4d] transition-colors shadow-lg"
              >
                {mode === "login" ? "Log in" : "Create account"}
              </button>

              <p className="text-xs text-center text-gray-500">By continuing you agree to our Terms and Privacy Policy</p>
            </form>
          </div>
        )}
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

  // NEW: State for the dynamically fetched article
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [gateActive, setGateActive] = useState(false);
  const gateSentinelRef = useRef(null);

  // Fetch article data from backend by slug (slug is used as :slug param)
  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    setError(null);
    setArticle(null);

    async function fetchArticle() {
      try {
  const res = await fetch(buildApiUrl(`/api/blogs/${encodeURIComponent(id)}`));
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to load article: ${res.status} ${text}`);
        }
        const data = await res.json();

        // Map backend Blog document to ArticleTemplate shape
        const mapped = {
          id: data.slug,
          slug: data.slug,
          title: data.mainHeading || data.metaTitle || "",
          subtitle: data.subHeading || data.metaDescription || "",
          category: data.category || "",
          difficulty: data.difficultyLevel || data.difficulty || "",
          views: data.views || 0,
          readTime: data.readingTime || data.readTime || 0,
          publishDate: data.scheduledAt
            ? new Date(data.scheduledAt).toLocaleDateString()
            : data.createdAt
            ? new Date(data.createdAt).toLocaleDateString()
            : new Date().toLocaleDateString(),
          author: data.author || "",
          authorImage:
            (data.gallery && data.gallery[0]) || data.heroImage || "/user.jpeg",
          authorBio:
            (data.coAuthors && data.coAuthors.join(", ")) ||
            data.authorBio ||
            "",
          heroImage:
            data.heroImage ||
            (data.gallery && data.gallery[0]) ||
            "/article1.jpg",
          contentPreviewHtml: data.content
            ? textToHtml(
                data.content
                  .split(/\n\s*\n/)
                  .slice(0, 1)
                  .join("\n\n")
              )
            : "",
          fullContentHtml: data.content
            ? /<\/?[a-z][\s\S]*>/i.test(data.content)
              ? data.content
              : textToHtml(data.content)
            : "",
          tags: data.tags || [],
          comments: data.comments || [],
          likes: data.likes || 0,
        };

        if (mounted) {
          setArticle(mapped);
          setIsSubscribed(false);
          setGateActive(false);
          window.scrollTo(0, 0);
        }

        // fetch related articles
        try {
          const relRes = await fetch(buildApiUrl('/api/blogs?limit=4'));
          if (relRes.ok) {
            const relData = await relRes.json();
            if (mounted) {
              const filtered = relData
                .filter((b) => b.slug !== data.slug)
                .slice(0, 3);
              setRelated(
                filtered.map((b) => ({
                  slug: b.slug,
                  title: b.mainHeading,
                  heroImage:
                    b.heroImage ||
                    (b.gallery && b.gallery[0]) ||
                    "/article1.jpg",
                  category: b.category || "",
                }))
              );
            }
          }
        } catch (err) {
          // non-fatal
          console.warn("related fetch failed", err);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError(String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchArticle();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleAuthSuccess = () => {
    setIsSubscribed(true);
    setGateActive(false);
  };

  // Trigger the gate once user reaches end of intro
  useEffect(() => {
    if (!article || !gateSentinelRef.current || isSubscribed) return;

    const el = gateSentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGateActive(true);
          }
        });
      },
      { root: null, threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [article, isSubscribed]); // Re-run when article loads

  // Show gate on first small user interaction (wheel/touch/scroll/keydown)
  // This is more reliable when navigating via client-side routing.
  useEffect(() => {
    if (isSubscribed) return;

    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setGateActive(true);
    };

    const onScroll = () => {
      if (window.pageYOffset > 10) trigger();
    };
    const onWheel = () => trigger();
    const onTouchStart = () => trigger();
    const onKeyDown = (e) => {
      if (["ArrowDown", "PageDown", " ", " "].includes(e.key)) trigger();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isSubscribed, article]);

  // Loading, error, and Not Found states
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Article not found</p>
      </div>
    );
  }

  return (
    <div ref={targetRef} className="bg-[#F9F9F9] min-h-screen">
      <ReadingProgress target={targetRef} />
      {/* Inline auth is inside the gate overlay now */}

      {/* Glassmorphism Gate Overlay */}
      <AnimatePresence>
        {gateActive && !isSubscribed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] pointer-events-none"
          >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
            <div className="relative h-full flex items-center justify-center p-4 pointer-events-auto">
              <SubscriptionGate onAuthSuccess={handleAuthSuccess} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                {article.authorBio && (
                  <div className="text-sm text-[#4B4B4B]">
                    {article.authorBio}
                  </div>
                )}
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
        <article className="prose prose-lg max-w-none prose-h2:text-3xl prose-h2:font-bold prose-h2:text-[#005c4d] prose-blockquote:border-[#006D5B] prose-blockquote:bg-[#DCE6D5]/40 prose-a:text-[#006D5B] hover:prose-a:text-[#005c4d]">
          {/* Article Content: show preview when not subscribed, full content after subscription */}
            <div>
              {isSubscribed ? (
                <RenderHtmlContent html={article.fullContentHtml || article.contentPreviewHtml} />
              ) : (
                <RenderHtmlContent html={article.contentPreviewHtml || article.fullContentHtml} />
              )}
            </div>

            {/* Gate sentinel (kept for analytics/behavior) */}
            <div ref={gateSentinelRef} aria-hidden="true" className="h-2" />
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

        {/* Comments Section: render only when comments exist */}
        {article.comments && article.comments.length > 0 && (
          <CommentSection comments={article.comments} />
        )}

        {/* Summary points */}
        {article.summaryPoints && article.summaryPoints.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-2xl border border-[#006D5B]/10">
            <h3 className="text-lg font-semibold text-[#005c4d] mb-3">
              Key takeaways
            </h3>
            <ul className="list-disc pl-5 text-[#4B4B4B] space-y-2">
              {article.summaryPoints.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Citations / Sources */}
        {(article.citations && article.citations.length > 0) ||
        (article.sources && article.sources.length > 0) ? (
          <div className="mt-8 bg-white p-6 rounded-2xl border border-[#006D5B]/10">
            {article.citations && article.citations.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-[#005c4d] mb-2">Citations</h4>
                <ul className="list-disc pl-5 text-[#4B4B4B]">
                  {article.citations.map((c, i) => (
                    <li key={i}>
                      {c.text}
                      {c.link ? ` — ${c.link}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.sources && article.sources.length > 0 && (
              <div>
                <h4 className="font-semibold text-[#005c4d] mb-2">Sources</h4>
                <ul className="list-disc pl-5 text-[#4B4B4B]">
                  {article.sources.map((s, i) => (
                    <li key={i}>
                      {s.label}
                      {s.url ? ` — ${s.url}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}

        {/* Attachments */}
        {article.attachments && article.attachments.length > 0 && (
          <div className="mt-8">
            <h4 className="font-semibold text-[#005c4d] mb-3">Attachments</h4>
            <div className="space-y-2">
              {article.attachments.map((a, i) => (
                <a
                  key={i}
                  href={a}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#006D5B] underline"
                >
                  {a}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Questions */}
        {article.quizQuestions && article.quizQuestions.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-2xl border border-[#006D5B]/10">
            <h3 className="text-lg font-semibold text-[#005c4d] mb-4">
              Quick quiz
            </h3>
            <ol className="list-decimal pl-5 text-[#4B4B4B] space-y-3">
              {article.quizQuestions.map((q, i) => (
                <li key={i}>
                  <div className="font-medium">{q.question}</div>
                  {q.options && (
                    <ul className="list-disc pl-5 mt-2 text-sm">
                      {q.options.map((opt, j) => (
                        <li key={j}>{opt}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

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
        <RelatedReads relatedArticles={related} />
      </motion.div>
    </div>
  );
}
