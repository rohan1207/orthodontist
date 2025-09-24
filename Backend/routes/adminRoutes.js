import express from 'express';
import { setupAdmin, loginAdmin } from '../controllers/adminController.js';

const router = express.Router();

// One-time setup to create the initial admin. Protect or delete after use.
router.post('/setup', setupAdmin);
router.post('/login', loginAdmin);

export default router;
