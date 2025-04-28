import express from 'express';
import { createInvoice, getInvoicesByWorkOrder } from '../controllers/invoiceController.js';

const router = express.Router();

// Create a new invoice
router.post('/', createInvoice);

// Get invoices by work order
router.get('/:workOrderId', getInvoicesByWorkOrder);

export default router;