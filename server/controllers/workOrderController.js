import { pool } from '../config/db.js';

// Create a new work order
export const createWorkOrder = async (req, res) => {
  const { order_id, service_id, mechanic_id, labor_hours, parts_used, total_cost } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO work_orders (order_id, service_id, mechanic_id, labor_hours, parts_used, total_cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [order_id, service_id, mechanic_id, labor_hours, parts_used, total_cost]
    );
    res.status(201).json({ workOrderId: result.rows[0].id });
  } catch (err) {
    console.error('Error creating work order:', err.message);
    res.status(500).json({ error: 'Failed to create work order', details: err.message });
  }
};

// Get all work orders
export const getWorkOrders = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM work_orders');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching work orders:', err.message);
    res.status(500).json({ error: 'Failed to fetch work orders', details: err.message });
  }
};