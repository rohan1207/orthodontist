import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRoutes from './routes/adminRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import examPrepRoutes from './routes/examPrepRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import topicSummaryRoutes from './routes/topicSummaryRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

dotenv.config();

const app = express();

// Configure CORS with credentials support
const allowedOrigins = [
  'http://localhost:5174',
  'http://localhost:3000',
  'https://orthodontist-backend-586c.onrender.com',
  'https://orthochronicles.com',
  'https://admin.orthochronicles.com',
  'http://localhost:5175'
  // Add other allowed origins as needed
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600, // Cache preflight request for 10 minutes
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Log CORS configuration
console.log('CORS Configuration:', {
  allowedOrigins,
  credentials: corsOptions.credentials,
  methods: corsOptions.methods,
  allowedHeaders: corsOptions.allowedHeaders
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set in environment');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Add routes after CORS middleware
  app.use('/api/admin', adminRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api/books', bookRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/exampreps', examPrepRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/topicsummaries', topicSummaryRoutes);
  // Allow-all CORS for public endpoints to avoid auth-related CORS blocks on Render
  app.options('/api/public/*', cors());
  app.use('/api/public', cors(), publicRoutes);

    app.get('/', (req, res) => res.json({ ok: true }));

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();