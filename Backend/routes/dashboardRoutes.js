import express from 'express';
import { 
  getDashboardStats,
  getUserCount,
  getBlogCount,
  getExamPrepCount,
  getTopicSummaryCount,
  getBookCount
} from '../controllers/dashboardController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect and admin middleware to all dashboard routes
router.use(protect, admin);

// Individual count endpoints
router.get('/users/count', getUserCount);
router.get('/blogs/count', getBlogCount);
router.get('/exam-preparations/count', getExamPrepCount);
router.get('/topic-summaries/count', getTopicSummaryCount);
router.get('/recommended-books/count', getBookCount);

// Dashboard statistics (all counts in one request)
router.get('/stats', getDashboardStats);

export default router;
