import express from 'express';
import { addVehicle, getVehiclesByUser } from '../controllers/vehicleController.js';

const router = express.Router();

// Add a new vehicle
router.post('/', addVehicle);

// Get all vehicles for a user
router.get('/:userId', getVehiclesByUser);

export default router;