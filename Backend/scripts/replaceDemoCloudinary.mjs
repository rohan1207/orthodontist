import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Blog from '../models/Blog.js';

// Load Backend .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// Replacement URLs provided by the user
const replacements = [
  'https://res.cloudinary.com/dahfy8kyt/image/upload/v1758713474/dc758b87-9b58-4549-91af-9ea341c84939.png',
  'https://res.cloudinary.com/dahfy8kyt/image/upload/v1758710670/article2_lhspad.jpg',
  'https://res.cloudinary.com/dahfy8kyt/image/upload/v1758710670/article3_arbpmy.jpg',
  'https://res.cloudinary.com/dahfy8kyt/image/upload/v1758710670/article1_fnivxm.avif',
];

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not set in env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('connected to mongodb');

  const regex = /res\.cloudinary\.com\/demo\//i;
  const docs = await Blog.find({
    $or: [
      { heroImage: { $regex: regex } },
      { gallery: { $elemMatch: { $regex: regex } } },
      { content: { $regex: regex } },
    ],
  });

  if (!docs.length) {
    console.log('No demo URLs to replace.');
    process.exit(0);
  }

  let idx = 0;
  for (const doc of docs) {
    let changed = false;
    if (Array.isArray(doc.gallery)) {
      for (let i = 0; i < doc.gallery.length; i++) {
        if (regex.test(doc.gallery[i])) {
          const replacement = replacements[idx % replacements.length];
          console.log(`Replacing gallery for slug=${doc.slug} gallery[${i}] -> ${replacement}`);
          doc.gallery[i] = replacement;
          idx++;
          changed = true;
        }
      }
    }
    if (doc.heroImage && regex.test(doc.heroImage)) {
      const replacement = replacements[idx % replacements.length];
      console.log(`Replacing heroImage for slug=${doc.slug} -> ${replacement}`);
      doc.heroImage = replacement;
      idx++;
      changed = true;
    }
    // Also replace any top-level string fields that contain demo URL
    for (const k of Object.keys(doc.toObject())) {
      const val = doc[k];
      if (typeof val === 'string' && regex.test(val)) {
        const replacement = replacements[idx % replacements.length];
        console.log(`Replacing field ${k} for slug=${doc.slug} -> ${replacement}`);
        doc[k] = replacement;
        idx++;
        changed = true;
      }
    }

    if (changed) {
      await doc.save();
      console.log(`Saved ${doc.slug}`);
    }
  }

  console.log('Replacement complete.');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
