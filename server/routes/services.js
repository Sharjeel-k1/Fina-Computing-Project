import express from 'express';
import { addService, getAllServices } from '../controllers/serviceController.js';

const router = express.Router();

// Add a new service
router.post('/', addService);

// Get all services
router.get('/', getAllServices);

export default router;