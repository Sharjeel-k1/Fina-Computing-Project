import { useEffect, useState } from 'react';
import { getUserFromToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const user = getUserFromToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    } else {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Car Model</th>
            <th className="p-3 text-left">Issue</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-3">{order.customer_name}</td>
              <td className="p-3">{order.car_model}</td>
              <td className="p-3">{order.issue}</td>
              <td className="p-3">{order.status}</td>
              <td className="p-3">{new Date(order.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// This code is a React component for an Admin Dashboard that displays a list of orders.
// It uses the useEffect hook to fetch orders from the server when the component mounts.    
// The fetchOrders function makes a GET request to the server with the user's token for authentication.
// The orders are displayed in a table format, with columns for customer name, car model, issue, status, and creation date.