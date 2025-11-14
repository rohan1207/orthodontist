import express from 'express';
import { 
    createTopicSummary, 
    getTopicSummaries, 
    getTopicSummaryById, 
    getSignedFileUrl,
    deleteTopicSummary,
    updateTopicSummary
} from '../controllers/topicSummaryController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Create a new topic summary
router.post('/', upload.single('file'), createTopicSummary);

// Get all topic summaries
router.get('/', getTopicSummaries);

// Get signed URL for a file (must be before the generic ':id' route)
router.get('/:id/signed-url', getSignedFileUrl);

// Get a specific topic summary by ID
router.get('/:id', getTopicSummaryById);

// Update a topic summary by ID
router.put('/:id', upload.single('file'), updateTopicSummary);

// Delete a topic summary by ID
router.delete('/:id', deleteTopicSummary);

export default router;
