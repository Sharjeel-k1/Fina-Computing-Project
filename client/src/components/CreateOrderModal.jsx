import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateOrderModal({ closeModal }) {
  const [carModel, setCarModel] = useState('');
  const [issue, setIssue] = useState('');
  const [numberPlate, setNumberPlate] = useState(''); // State for manually entering number_plate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const requestBody = { car_model: carModel, issue, number_plate: numberPlate }; // Include number_plate

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();

      if (res.ok) {
        alert('Order created successfully');
        closeModal();
        navigate('/orders'); // Redirect to the orders page
      } else {
        console.error('Error:', data);
        alert(data.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the order');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content create-order-modal">
        <span className="close-icon" onClick={closeModal}>
          &times;
        </span>
        <h2 className="text-center text-3xl font-bold mb-6">Create Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="numberPlate" className="block text-sm font-medium mb-2">
              Enter Number Plate
            </label>
            <input
              type="text"
              id="numberPlate"
              value={numberPlate}
              onChange={(e) => setNumberPlate(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Number Plate"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="carModel" className="block text-sm font-medium mb-2">
              Car Model
            </label>
            <input
              type="text"
              id="carModel"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Car Model"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="issue" className="block text-sm font-medium mb-2">
              Issue
            </label>
            <textarea
              id="issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Describe the issue"
            ></textarea>
          </div>
          <button className="button-primary w-full">Create Order</button>
        </form>
      </div>
    </div>
  );
}