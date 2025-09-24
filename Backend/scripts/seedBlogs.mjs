import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Blog from '../models/Blog.js';

// Ensure we load the Backend/.env even when running from the scripts folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootEnv = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: rootEnv });

// Import the demo blogs from the frontend data file. We reference the frontend project path.
// The frontend is in `orthodontist/` at repo root.
import frontendDemo from '../../orthodontist/src/data/Blogs.js';
const demo = (frontendDemo && frontendDemo.default) ? frontendDemo.default : frontendDemo;

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not set in env');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('connected');
  await Blog.deleteMany({});
  const docs = demo.map(b => ({ ...b, status: b.status || 'published' }));
  await Blog.insertMany(docs);
  console.log('seeded', docs.length);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
