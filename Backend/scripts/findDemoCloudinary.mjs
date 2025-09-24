import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Blog from '../models/Blog.js';

// Load the Backend .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not set in env (Backend/.env)');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('connected to mongodb');

  // Find any blog documents where heroImage or any gallery entry references the demo host
  const regex = /res\.cloudinary\.com\/demo\//i;

  const docs = await Blog.find({
    $or: [
      { heroImage: { $regex: regex } },
      { gallery: { $elemMatch: { $regex: regex } } },
      { content: { $regex: regex } },
    ],
  }).lean();

  if (!docs.length) {
    console.log('No demo Cloudinary URLs found in Blog collection.');
    process.exit(0);
  }

  console.log(`Found ${docs.length} blog(s) with demo Cloudinary URLs:`);
  for (const d of docs) {
    const hits = [];
    if (d.heroImage && regex.test(d.heroImage)) hits.push({ field: 'heroImage', value: d.heroImage });
    if (d.gallery && Array.isArray(d.gallery)) {
      d.gallery.forEach((g, idx) => {
        if (g && regex.test(g)) hits.push({ field: `gallery[${idx}]`, value: g });
      });
    }
    // Inspect any string fields (cheap scan of top-level fields)
    for (const k of Object.keys(d)) {
      if (typeof d[k] === 'string' && regex.test(d[k]) && k !== 'heroImage') {
        hits.push({ field: k, value: d[k] });
      }
    }

    console.log('---');
    console.log(`slug: ${d.slug}  _id: ${d._id}`);
    hits.forEach(h => console.log(`  ${h.field}: ${h.value}`));
  }

  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
