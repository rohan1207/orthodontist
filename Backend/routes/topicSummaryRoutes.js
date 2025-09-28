import express from 'express';
import { createTopicSummary, getTopicSummaries, getTopicSummaryById, getSignedFileUrl } from '../controllers/topicSummaryController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.post('/', upload.single('file'), createTopicSummary);
router.get('/', getTopicSummaries);
// Note: define the signed-url route before the generic ':id' route
router.get('/:id/signed-url', getSignedFileUrl);
router.get('/:id', getTopicSummaryById);

export default router;
