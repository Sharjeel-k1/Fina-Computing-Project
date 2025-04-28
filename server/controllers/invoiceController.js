import { pool } from '../config/db.js';

// Create a new invoice
export const createInvoice = async (req, res) => {
  const { work_order_id, amount, payment_status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO invoices (work_order_id, amount, payment_status) VALUES ($1, $2, $3) RETURNING id',
      [work_order_id, amount, payment_status]
    );
    res.status(201).json({ invoiceId: result.rows[0].id });
  } catch (err) {
    console.error('Error creating invoice:', err.message);
    res.status(500).json({ error: 'Failed to create invoice', details: err.message });
  }
};

// Get invoices by work order
export const getInvoicesByWorkOrder = async (req, res) => {
  const { workOrderId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM invoices WHERE work_order_id = $1', [workOrderId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching invoices:', err.message);
    res.status(500).json({ error: 'Failed to fetch invoices', details: err.message });
  }
};