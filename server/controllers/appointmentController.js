import { pool } from '../config/db.js';

// Create a new appointment
export const createAppointment = async (req, res) => {
  const { user_id, vehicle_id, appointment_date, appointment_time, notes } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO appointments (user_id, vehicle_id, appointment_date, appointment_time, notes) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [user_id, vehicle_id, appointment_date, appointment_time, notes]
    );
    res.status(201).json({ appointmentId: result.rows[0].id });
  } catch (err) {
    console.error('Error creating appointment:', err.message);
    res.status(500).json({ error: 'Failed to create appointment', details: err.message });
  }
};

// Get all appointments for a user
export const getAppointmentsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM appointments WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching appointments:', err.message);
    res.status(500).json({ error: 'Failed to fetch appointments', details: err.message });
  }
};