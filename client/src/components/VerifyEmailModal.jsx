import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VerifyEmailModal() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/verify/${token}`, {
          method: 'GET',
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to verify email');
        }
        setMessage('Email verified successfully! You can now log in.');
      } catch (err) {
        setError(true);
        setMessage(err.message);
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-icon" onClick={() => navigate('/login')}>
          &times;
        </span>
        <h2 className="text-center text-3xl font-bold mb-4">
          {error ? 'Verification Failed' : 'Verifying Email...'}
        </h2>
        <p className="text-center">{message}</p>
      </div>
    </div>
  );
}

export const verifyEmail = async (req, res) => {
  const token = req.params.token;
  try {
    // ...existing code...
    if (!user || user.token_expiration < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }
    // ...existing code...
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};