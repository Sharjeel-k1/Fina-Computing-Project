import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import CreateOrderModal from './components/CreateOrderModal';

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const openLogin = (message = '') => {
    setSuccessMessage(message);
    setIsLoginOpen(true);
  };
  const closeLogin = () => setIsLoginOpen(false);

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  const openCreateOrder = () => setIsCreateOrderOpen(true);
  const closeCreateOrder = () => setIsCreateOrderOpen(false);

  return (
    <BrowserRouter>
      <Navbar
        openLogin={openLogin}
        openRegister={openRegister}
        openCreateOrder={openCreateOrder}
      />
      <Routes>
        <Route path="/" element={<Home openCreateOrder={openCreateOrder} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
      {isLoginOpen && (
        <LoginModal closeModal={closeLogin} successMessage={successMessage} />
      )}
      {isRegisterOpen && (
        <RegisterModal closeModal={closeRegister} openLoginModal={openLogin} />
      )}
      {isCreateOrderOpen && (
        <CreateOrderModal closeModal={closeCreateOrder} />
      )}
    </BrowserRouter>
  );
}
