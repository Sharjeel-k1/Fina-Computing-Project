import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ closeModal, successMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // State for Forgot Password modal
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [userId, setUserId] = useState(null);
  const [twoFACode, setTwoFACode] = useState('');
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to log in');
      }

      if (data.twoFactorRequired) {
        setTwoFactorRequired(true);
        setUserId(data.userId);
        setMessage('A 2FA code has been sent to your email.');
      } else if (data.token) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        closeModal();
        navigate('/'); // Redirect to the home page
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handle2FAVerify = async (e) => {
    e.preventDefault();
    setIsVerifying2FA(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, code: twoFACode }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '2FA verification failed');
      }
      localStorage.setItem('token', data.token);
      setMessage('Login successful!');
      closeModal();
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsVerifying2FA(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Password reset email sent. Please check your inbox.');
      setShowForgotPasswordModal(false); // Close the Forgot Password modal
    } else {
      alert(data.error || 'Failed to send password reset email.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content login-modal">
        <span className="close-icon" onClick={closeModal}>
          &times;
        </span>
        {typeof successMessage === 'string' && successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        <h2 className="text-center text-3xl font-bold mb-4">Login</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={twoFactorRequired ? handle2FAVerify : handleLogin}>
          {!twoFactorRequired && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </>
          )}
          {twoFactorRequired && (
            <>
              <input
                type="text"
                placeholder="Enter 2FA code"
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value)}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                maxLength={6}
              />
            </>
          )}
          <button className="button-primary w-full" disabled={isVerifying2FA}>
            {twoFactorRequired ? (isVerifying2FA ? 'Verifying...' : 'Verify 2FA') : 'Login'}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setShowForgotPasswordModal(true)}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="modal">
          <div className="modal-content forgot-password-modal">
            <span
              className="close-icon"
              onClick={() => setShowForgotPasswordModal(false)}
            >
              &times;
            </span>
            <h2 className="text-center text-3xl font-bold mb-4">
              Forgot Password
            </h2>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <button className="button-primary w-full">
                Send Reset Email
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}