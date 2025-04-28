import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ closeModal, successMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // State for Forgot Password modal
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      closeModal();
      navigate('/'); // Redirect to the home page
    } else {
      setErrorMessage('Email or password is wrong');
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
      alert('Failed to send password reset email. Please try again.');
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
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
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
          <button className="button-primary w-full">Login</button>
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