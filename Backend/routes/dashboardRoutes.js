import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';

const router = express.Router();

// You might want to add authentication middleware here to protect the route
// import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/stats').get(getDashboardStats); // Should be protected: .get(protect, admin, getDashboardStats)

export default router;
