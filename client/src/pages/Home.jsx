import logo from '../assets/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';

export default function Home({ openCreateOrder }) {
  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center relative">
      <img
        src={logo}
        alt="logo"
        className="w-full h-full object-cover absolute top-0 left-0 z-[-1]" // Fullscreen logo styles
      />
      <h1 className="text-4xl font-bold mb-2 text-black">Salman Car Workshop</h1>
      <p className="text-lg text-center max-w-xl text-black">
        Secure, scalable car repair management solution.
      </p>
      <section className="hero">
        <h1 className="text-black">Welcome to Salman Car Workshop</h1>
        <p className="text-black">Your trusted partner for car repair and maintenance.</p>
        <button onClick={openCreateOrder} className="button-primary">
          Book an Appointment
        </button>
      </section>
      <div className="container">
        <div className="card text-black">
          <h2>Our Services</h2>
          <p>We offer a wide range of services, including diagnostics, repairs, and maintenance.</p>
        </div>
        <div className="card text-black">
          <h2>Why Choose Us?</h2>
          <p>Experienced mechanics, transparent pricing, and excellent customer service.</p>
        </div>
      </div>
      {/* Map Section */}
      <div className="map-container">
        <h2 className="text-white">Find Us</h2> {/* Make the text white */}
        <div className="map-wrapper">
          <iframe
            title="Workshop Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23614.123456789!2d39.6967!3d21.8044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d123456789ab%3A0x123456789abcdef!2sW876%2BF7%20Asfan%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1614311234567!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
