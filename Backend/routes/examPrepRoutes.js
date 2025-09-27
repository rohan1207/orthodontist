import express from 'express';
import {
  getAllExamPreps,
  getExamPrepById,
  createExamPrep,
  updateExamPrep,
  deleteExamPrep,
} from '../controllers/examPrepController.js';

const router = express.Router();

// You might want to add authentication middleware here for the protected routes
// import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
  .get(getAllExamPreps)
  .post(createExamPrep); // Should be protected: .post(protect, admin, createExamPrep)

router.route('/:id')
  .get(getExamPrepById)
  .put(updateExamPrep) // Should be protected: .put(protect, admin, updateExamPrep)
  .delete(deleteExamPrep); // Should be protected: .delete(protect, admin, deleteExamPrep)

export default router;
