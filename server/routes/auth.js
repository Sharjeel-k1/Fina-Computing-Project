import express from 'express';
import { register, login, verifyEmail, verify2FA } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.get('/verify/:token', verifyEmail);
router.post('/login', login);
router.post('/verify-2fa', verify2FA);

export default router;