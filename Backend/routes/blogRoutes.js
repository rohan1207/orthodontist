import express from 'express';
import { 
  uploadImage, 
  createBlog, 
  listBlogs, 
  getBlogBySlug, 
  updateBlog, 
  deleteBlog 
} from '../controllers/blogController.js';
import { verifyAdmin } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js'; // Import the centralized upload config

const router = express.Router();

// Public routes
router.get('/', listBlogs); // List blogs with filtering
router.get('/:slug', getBlogBySlug); // Get single blog by slug

// Admin routes (require authentication)
// The 'upload.single('file')' middleware processes the image upload.
router.post('/upload', verifyAdmin, upload.single('file'), uploadImage);

router.post('/', verifyAdmin, createBlog); // Create new blog
router.put('/:slug', verifyAdmin, updateBlog); // Update blog
router.delete('/:slug', verifyAdmin, deleteBlog); // Delete blog

// Add a generic error handler for multer errors, if needed
router.use((error, req, res, next) => {
  if (error instanceof upload.MulterError) {
    return res.status(400).json({ error: `File upload error: ${error.message}` });
  }
  next(error);
});

export default router;