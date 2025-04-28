import { pool } from '../config/db.js';

// Add a new vehicle
export const addVehicle = async (req, res) => {
  const { make, model, year, license_plate, vin } = req.body;
  const userId = req.user.userId; // Extract user ID from the token

  try {
    const result = await pool.query(
      'INSERT INTO vehicles (user_id, make, model, year, license_plate, vin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [userId, make, model, year, license_plate, vin]
    );
    res.status(201).json({ vehicleId: result.rows[0].id });
  } catch (err) {
    console.error('Error adding vehicle:', err.message);
    res.status(500).json({ error: 'Failed to add vehicle', details: err.message });
  }
};

// Get all vehicles for a user
export const getVehiclesByUser = async (req, res) => {
  const userId = req.user.userId; // Extract user ID from the token
  try {
    const result = await pool.query('SELECT * FROM vehicles WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching vehicles:', err.message);
    res.status(500).json({ error: 'Failed to fetch vehicles', details: err.message });
  }
};