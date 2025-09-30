import React, { useState, useEffect, useRef } from "react";
import { buildApiUrl } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from 'dompurify';
import edjsHTML from 'editorjs-html';
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
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import SubscriptionGate from '../components/SubscriptionGate.jsx';
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

// Generic component to render sanitized HTML
const RenderHtmlContent = ({ html }) => {
  // We trust DOMPurify to sanitize, so we can directly set the HTML.
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

// Related Reads Component
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
  }, [target]);

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
  const { user } = useAuth(); // Use the global auth context
  const { id } = useParams();
  const targetRef = useRef();

  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [gateActive, setGateActive] = useState(false);
  const gateSentinelRef = useRef(null);

  // Fetch article data from backend by slug
  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    setError(null);
    setArticle(null);

    const edjsParser = edjsHTML({
      table: function (block) {
        const data = block.data;
        const headers = data.withHeadings ? data.content.shift() : [];
        const headerHtml = headers.length ? `<thead><tr>${headers.map(cell => `<th>${cell}</th>`).join('')}</tr></thead>` : '';
        const rows = data.content.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
        return `<div class="table-wrapper"><table class="table">${headerHtml}<tbody>${rows}</tbody></table></div>`;
      }
    });

    async function fetchArticle() {
      try {
        const res = await fetch(buildApiUrl(`/api/blogs/${encodeURIComponent(id)}`));
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to load article: ${res.status} ${text}`);
        }
        const data = await res.json();

        const mapped = {
          id: data.slug,
          slug: data.slug,
          title: data.mainHeading || data.metaTitle || "",
          subtitle: data.subHeading || data.metaDescription || "",
          category: data.category || "",
          difficulty: data.difficultyLevel || "",
          views: data.views || 0,
          readTime: data.readingTime || 0,
          publishDate: new Date(data.scheduledAt || data.createdAt || Date.now()).toLocaleDateString(),
          author: data.author || "",
          authorImage:  "/user.jpeg" || data.heroImage ,
          authorBio: (data.coAuthors && data.coAuthors.join(", ")) || "",
          heroImage: data.heroImage || "/article1.jpg",
          contentPreviewHtml: "",
          fullContentHtml: "",
          tags: data.tags || [],
          comments: data.comments || [],
          likes: data.likes || 0,
        };
        
                if (data.content) {
            try {
              const contentData = JSON.parse(data.content);
              const parsedBlocks = edjsParser.parse(contentData);
              
              // Handle both array (multi-block) and string (single-block) parser output
              if (Array.isArray(parsedBlocks)) {
                mapped.fullContentHtml = DOMPurify.sanitize(parsedBlocks.join(''));
                mapped.contentPreviewHtml = DOMPurify.sanitize(parsedBlocks.slice(0, 2).join(''));
              } else if (typeof parsedBlocks === 'string') {
                mapped.fullContentHtml = DOMPurify.sanitize(parsedBlocks);
                mapped.contentPreviewHtml = DOMPurify.sanitize(parsedBlocks);
              } else {
                 throw new Error("Parsed content is not a recognized format.");
              }

            } catch (e) {
              console.error("Failed to parse Editor.js content:", e);
              mapped.fullContentHtml = "<p>Error rendering content.</p>";
              mapped.contentPreviewHtml = "<p>Error rendering content.</p>";
            }
        }
        if (mounted) {
          setArticle(mapped);
          // No longer reset subscription status on each load
          setGateActive(false);
          window.scrollTo(0, 0);
        }

        // fetch related articles
        try {
          const relRes = await fetch(buildApiUrl('/api/blogs?limit=4'));
          if (relRes.ok) {
            const relData = await relRes.json();
            if (mounted && relData.blogs) {
              const filtered = relData.blogs
                .filter((b) => b.slug !== data.slug)
                .slice(0, 3);
              setRelated(
                filtered.map((b) => ({
                  slug: b.slug,
                  title: b.mainHeading,
                  heroImage: b.heroImage || "/article1.jpg",
                  category: b.category || "",
                }))
              );
            }
          }
        } catch (err) {
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

  // When auth succeeds, the `user` object from context will update.
  // We just need to hide the gate.
  const handleAuthSuccess = () => {
    setGateActive(false);
  };

  useEffect(() => {
    // Depend on the global `user` object instead of local state
    if (!article || !gateSentinelRef.current || user) return;

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
  }, [article, user]);

  useEffect(() => {
    // Depend on the global `user` object
    if (user) return;

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
      if (["ArrowDown", "PageDown", " "].includes(e.key)) trigger();
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
  }, [user, article]);

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
      <AnimatePresence>
        {gateActive && !user && (
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
        <div className="mb-8">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-[#4B4B4B] hover:text-[#006D5B] transition-colors group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
        </div>
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
        <article className="prose prose-lg max-w-none prose-h2:text-3xl prose-h2:font-bold prose-h2:text-[#005c4d] prose-blockquote:border-[#006D5B] prose-blockquote:bg-[#DCE6D5]/40 prose-a:text-[#006D5B] hover:prose-a:text-[#005c4d]">
          <div>
            {user ? (
              <RenderHtmlContent html={article.fullContentHtml} />
            ) : (
              <RenderHtmlContent html={article.contentPreviewHtml} />
            )}
          </div>
          <div ref={gateSentinelRef} aria-hidden="true" className="h-2" />
        </article>
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
        {article.comments && article.comments.length > 0 && (
          <CommentSection comments={article.comments} />
        )}
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
                  className="block text-[#006D5B] hover:underline"
                >
                  {a}
                </a>
              ))}
            </div>
          </div>
        )}
        <RelatedReads relatedArticles={related} />
      </motion.div>
    </div>
  );
}