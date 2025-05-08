import React, { useState } from 'react';

export default function RegisterModal({ closeModal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Track if registration was successful
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, contact_number: contactNumber }),
      });

      const data = await res.json();
      if (!res.ok) {
        setIsSuccess(false);
        setMessage(data.error || 'Failed to register');
        setShowVerifyModal(true); // Show error modal
        return; // Do not close modal
      }

      setMessage('Registration successful! Please check your email to verify your account.');
      setIsSuccess(true);
      setShowVerifyModal(true);
    } catch (err) {
      setMessage(err.message);
      setIsSuccess(false);
      setShowVerifyModal(true);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-icon" onClick={closeModal}>
          &times;
        </span>
        <h2 className="text-center text-3xl font-bold mb-4">Register</h2>
        {message && (
          <p className={`text-center mb-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
        )}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
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
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button className="button-primary w-full">Register</button>
        </form>
      </div>
      {showVerifyModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-content bg-white text-black p-6 rounded shadow-md max-w-sm w-full text-center relative">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-600 hover:text-red-500"
              onClick={() => {
                setShowVerifyModal(false);
                if (isSuccess) closeModal();
              }}
            >
              &times;
            </button>
            <p className={`mb-2 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
