import express from 'express';
import multer from 'multer';
import { uploadImage, createBlog, listBlogs, getBlogBySlug } from '../controllers/blogController.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/upload', verifyAdmin, upload.single('file'), uploadImage);
router.post('/', verifyAdmin, createBlog);
router.get('/', listBlogs);
router.get('/:slug', getBlogBySlug);

export default router;
