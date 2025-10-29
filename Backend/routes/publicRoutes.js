import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';

// Public, unauthenticated routes for read-only data
const router = express.Router();

// Public dashboard statistics (no auth required)
// GET /api/public/stats
router.get('/stats', getDashboardStats);

export default router;
