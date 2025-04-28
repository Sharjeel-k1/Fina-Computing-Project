import { pool } from '../config/db.js';

// Add a new service
export const addService = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO services (name, description, price) VALUES ($1, $2, $3) RETURNING id',
      [name, description, price]
    );
    res.status(201).json({ serviceId: result.rows[0].id });
  } catch (err) {
    console.error('Error adding service:', err.message);
    res.status(500).json({ error: 'Failed to add service', details: err.message });
  }
};

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching services:', err.message);
    res.status(500).json({ error: 'Failed to fetch services', details: err.message });
  }
};