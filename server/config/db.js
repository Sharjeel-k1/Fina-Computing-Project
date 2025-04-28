import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
export { pool };