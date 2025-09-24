import Blog from '../models/Blog.js';
import streamifier from 'streamifier';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadBufferToCloudinary(buffer, folder = 'blogs') {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

export async function uploadImage(req, res) {
  if (!req.file || !req.file.buffer) return res.status(400).json({ error: 'no file uploaded' });
  try {
    const result = await uploadBufferToCloudinary(req.file.buffer, 'blogs');
    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    console.error('cloudinary upload error', err);
    // In development, return the underlying error message to help debugging
    const message = process.env.NODE_ENV === 'production' ? 'upload failed' : (err && err.message) || 'upload failed';
    res.status(500).json({ error: message });
  }
}

export async function createBlog(req, res) {
  try {
    const payload = req.body;
    // ensure images (heroImage, gallery) are URLs (simple check)
    if (payload.heroImage && !/^https?:\/\//.test(payload.heroImage)) {
      return res.status(400).json({ error: 'heroImage must be a URL' });
    }
    if (payload.gallery && !Array.isArray(payload.gallery)) payload.gallery = [];
    const blog = new Blog(payload);
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'could not create blog' });
  }
}

export async function listBlogs(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const blogs = await Blog.find({ status: 'published' }).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
  res.json(blogs);
}

export async function getBlogBySlug(req, res) {
  const { slug } = req.params;
  const blog = await Blog.findOne({ slug });
  if (!blog) return res.status(404).json({ error: 'not found' });
  res.json(blog);
}
