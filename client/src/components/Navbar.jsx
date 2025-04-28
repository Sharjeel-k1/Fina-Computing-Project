import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import CreateOrderModal from './CreateOrderModal';

export default function Navbar({ openLogin, openRegister, openCreateOrder }) {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h1>Salman Car Workshop</h1>
      <div className="navbar-center">
        <a href="/" className="navbar-link">Home</a>
        {token ? (
          <>
            <a href="/orders" className="navbar-link">Orders</a>
            <span onClick={openCreateOrder} className="navbar-link">
              Create Order
            </span>
            <a href="/" onClick={handleLogout} className="navbar-link">
              Logout
            </a>
          </>
        ) : (
          <>
            <span onClick={openLogin} className="navbar-link">Login</span>
            <span onClick={openRegister} className="navbar-link">Register</span>
          </>
        )}
      </div>
    </nav>
  );
}
