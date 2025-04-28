import { useEffect, useState } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to view orders.');
        return;
      }

      const res = await fetch('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []); // Ensure orders is always an array
      } else {
        alert(data.error || 'Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
      <div className="bg-white text-black p-6 rounded shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Number Plate</th>
              <th className="p-2 border">Car Model</th>
              <th className="p-2 border">Issue</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.number_plate}</td>
                  <td className="p-2 border">{order.car_model}</td>
                  <td className="p-2 border">{order.issue}</td>
                  <td className="p-2 border">{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
