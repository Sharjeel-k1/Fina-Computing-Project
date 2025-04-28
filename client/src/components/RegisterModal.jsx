import { useState } from 'react';

export default function RegisterModal({ closeModal, openLoginModal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact_number, setContactNumber] = useState(''); // Updated to match the schema

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, contact_number }), // Use contact_number as per schema
    });
    const data = await res.json();
    if (res.ok) {
      closeModal(); // Close the registration modal
      openLoginModal('Registration successful!'); // Open the login modal with a success message
    } else {
      alert(data.error || 'Registration failed');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content register-modal">
        <span className="close-icon" onClick={closeModal}>
          &times;
        </span>
        <h2 className="text-center text-3xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
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
            value={contact_number} // Updated to match the schema
            onChange={(e) => setContactNumber(e.target.value)} // Correctly extract the value
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button className="button-primary w-full">Register</button>
        </form>
      </div>
    </div>
  );
}