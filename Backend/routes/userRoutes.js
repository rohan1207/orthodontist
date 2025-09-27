import express from 'express';
import { signup, signupVerified, login, googleLogin, protect } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signup-verified', signupVerified);
router.post('/login', login);
router.post('/google-login', googleLogin);

// A protected route to test authentication
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});

export default router;
