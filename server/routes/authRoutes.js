import express from 'express';
import { register, login, forgotPassword, verifyEmail } from '../controllers/authController.js';


const router = express.Router();

// Example authentication route
router.post('/login', (req, res) => {
  // Implement login logic here
  res.json({ message: 'Login route' });
});

router.post('/register', (req, res) => {
  // Implement registration logic here
  res.json({ message: 'Register route' });
});

// Forgot Password Route
router.post('/forgot-password', forgotPassword);

// Verify Email Route
router.get('/verify-email/:token', verifyEmail);

export default router;