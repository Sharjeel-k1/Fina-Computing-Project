import express from 'express';
import { createAppointment, getAppointmentsByUser } from '../controllers/appointmentController.js';

const router = express.Router();

// Create a new appointment
router.post('/', createAppointment);

// Get all appointments for a user
router.get('/:userId', getAppointmentsByUser);

export default router;