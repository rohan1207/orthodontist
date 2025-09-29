import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRoutes from './routes/adminRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import examPrepRoutes from './routes/examPrepRoutes.js';
import topicSummaryRoutes from './routes/topicSummaryRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const app = express();

// Configure and normalize CORS origins from env (comma-separated). If not set,
// fall back to allowing all origins for easier debugging.
let corsOptions;
if (process.env.CORS_ORIGIN) {
  const origins = process.env.CORS_ORIGIN
    .split(',')
    .map((s) => s.trim().replace(/\/$/, ''))
    .filter(Boolean);
  corsOptions = {
    origin: origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
} else {
  // undefined => allow all origins (cors default)
  corsOptions = undefined;
}

console.log('Effective CORS origins:', corsOptions && corsOptions.origin ? corsOptions.origin : 'allow-all');
app.use(cors(corsOptions));
// Handle preflight requests
app.options('*', cors(corsOptions));

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
    app.use('/api/topicsummaries', topicSummaryRoutes);
    app.use('/api', dashboardRoutes); // Dashboard routes include /api prefix in their paths

    app.get('/', (req, res) => res.json({ ok: true }));

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();