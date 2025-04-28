import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, contact_number: contactNumber }),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Registration successful');
      navigate('/login');
    } else {
      console.error('Error:', data);
      alert(data.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-600 text-white">
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button className="button-primary w-full">Register</button>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}