import express from 'express';
import { getOrders, createOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getOrders);
router.post('/', authMiddleware, createOrder);

export default router;
