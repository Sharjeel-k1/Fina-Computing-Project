import express from 'express';
import { createWorkOrder, getWorkOrders } from '../controllers/workOrderController.js';

const router = express.Router();

// Create a new work order
router.post('/', createWorkOrder);

// Get all work orders
router.get('/', getWorkOrders);

export default router;