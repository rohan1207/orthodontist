import mongoose from 'mongoose';

// Simple URL validator: ensures image fields store URLs (or local paths starting with '/')
function isUrl(val) {
  if (!val) return true; // allow empty values
  try {
    // Accept absolute http(s) URLs or leading-slash local paths
    return /^(https?:)?\/\//.test(val) || val.startsWith('/');
  } catch (e) {
    return false;
  }
}

const QuizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], default: [] },
  correctAnswer: { type: Number, default: 0 },
});

const ShareSchema = new mongoose.Schema({
  facebook: { type: Number, default: 0 },
  twitter: { type: Number, default: 0 },
  whatsapp: { type: Number, default: 0 },
}, { _id: false });

const CitationSchema = new mongoose.Schema({ text: String, link: String }, { _id: false });
const SourceSchema = new mongoose.Schema({ label: String, url: String }, { _id: false });

const CommentSchema = new mongoose.Schema({
  author: String,
  authorImage: String,
  content: String,
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  isStudent: { type: Boolean, default: false },
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
  mainHeading: { type: String, required: true, index: true },
  subHeading: { type: String },
  slug: { type: String, required: true, unique: true, index: true },

  // Images are stored as URLs (Cloudinary). No binary/image blobs should be stored in Mongo.
  heroImage: { type: String, validate: { validator: isUrl, message: 'heroImage must be a URL or local path' } },
  gallery: { type: [String], validate: { validator: (arr) => arr.every(isUrl), message: 'gallery must contain only URLs' }, default: [] },

  // Content may be stored as HTML (from TinyMCE) or markdown text
  content: { type: String },

  tags: { type: [String], default: [] },
  category: { type: String, index: true },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  scheduledAt: { type: Date },

  readingTime: { type: Number, default: 0 },
  metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: [String], default: [] },

  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  saved: { type: Boolean, default: false },
  shares: { type: ShareSchema, default: {} },

  comments: { type: [CommentSchema], default: [] },
  citations: { type: [CitationSchema], default: [] },
  sources: { type: [SourceSchema], default: [] },

  videoEmbed: { type: String },
  attachments: { type: [String], default: [] },

  difficultyLevel: { type: String },
  summaryPoints: { type: [String], default: [] },
  quizQuestions: { type: [QuizQuestionSchema], default: [] },

  author: { type: String },
  coAuthors: { type: [String], default: [] },

}, { timestamps: true });

// Indexes for common queries
BlogSchema.index({ slug: 1 });
BlogSchema.index({ category: 1, tags: 1 });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;
