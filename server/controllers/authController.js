import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';
import nodemailer from 'nodemailer';

// Register a new user
export const register = async (req, res) => {
  const { name, email, password, contact_number } = req.body; // Include contact_number
  if (!name || !email || !password || !contact_number) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (name, email, password, contact_number) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, hashedPassword, contact_number]
    );

    res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].id });
  } catch (err) {
    console.error('Error registering user:', err.message); // Log the error
    res.status(500).json({ error: 'Failed to register user', details: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a password reset token (you can use a random string or JWT)
    const resetToken = Math.random().toString(36).substring(2, 15);

    // Save the reset token and expiration in the database
    await pool.query(
      'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE email = $3',
      [resetToken, Date.now() + 3600000, email] // Token valid for 1 hour
    );

    // Send the password reset email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}" target="_blank">Reset Password</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error in forgotPassword:', error.message);
    res.status(500).json({ error: 'Failed to send password reset email' });
  }
};
