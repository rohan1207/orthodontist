import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRoutes from './routes/adminRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const app = express();
// Configure CORS from environment when deployed (e.g. set CORS_ORIGIN to a single origin
// or a comma-separated list). If not set, fall back to the default behavior (allow all).
const corsOptions = process.env.CORS_ORIGIN
  ? { origin: process.env.CORS_ORIGIN.split(',') }
  : undefined;
app.use(cors(corsOptions));
// Support preflight for all routes
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set in environment');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    app.use('/api/admin', adminRoutes);
    app.use('/api/blogs', blogRoutes);

    app.get('/', (req, res) => res.json({ ok: true }));

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
