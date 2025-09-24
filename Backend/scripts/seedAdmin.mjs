import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure we load the Backend/.env even when running from the scripts folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootEnv = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: rootEnv });
import Admin from '../models/Admin.js';

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not set in env');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('connected');
  const username = 'Shravani@123';
  const password = 'Shravani@123';
  const exists = await Admin.findOne({ username });
  if (exists) {
    console.log('admin already exists');
    process.exit(0);
  }
  const admin = new Admin({ username, password });
  await admin.save();
  console.log('admin created');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
