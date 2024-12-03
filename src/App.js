import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookingForm from './components/BookingForm';
import BookingSummary from './components/BookingSummary';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BookingList from './components/BookingList';
import './styles.css'; // Import your CSS file for styling

const Home = () => (
  <div>
    <h1>Welcome to the FieldZone Booking </h1>
    <img src="/pic/background.jpg" alt="Football Field" className="home-image" />
    <table className="styled-table"> {/* Use className instead of class */}
      <thead>
        <tr>
          <th>Timing Slot</th>
          <th>Price</th>
          <th>Peak Hour</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>5pm-7pm</td>
          <td>RM450</td>
          <td>No</td>
        </tr>
        <tr>
          <td>7pm-9pm</td>
          <td>RM450</td>
          <td>No</td>
        </tr>
        <tr>
          <td>9pm-10pm</td>
          <td>RM450</td>
          <td>No</td>
        </tr>
        <tr className="peak-slot"> {/* Use className instead of class */}
          <td>11pm-1am</td>
          <td>RM500</td>
          <td>Yes</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const AuthLayout = ({ children }) => (
  <div className="auth-layout">
    <Navbar />
    {children}
  </div>
);

const App = () => {
  const [booking, setBooking] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userId, setUserId] = useState(null); // State to hold userId

  const handleBook = (bookingDetails) => {
    setBooking(bookingDetails);
  
  };

  const handleLogin = (userId) => {
    console.log('User logged in with userId:', userId);
    setIsLoggedIn(true);
    setUserId(userId); // Set userId when logged in
  };

  const handleRegister = (userId, username) => {
    console.log('User registered with userId:', userId);
    setIsRegistering(false);
    alert('Registration successful! Please log in.');
    setUserId(userId); // Set userId after registration
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        <main>
          {isRegistering ? (
            <RegisterForm onRegister={handleRegister} />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Back to Login' : 'Register'}
          </button>
        </main>
      </div>
    );
  }

  return (
    <Router>
      <div className="container">
        <AuthLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/booking"
              element={
                <>
                  <BookingForm onBook={handleBook} userId={userId} />
                  <BookingSummary booking={booking} />
               
                </>
              }
            />
            <Route path="/bookings" element={<BookingList userId={userId} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthLayout>
        <footer>
          <p>&copy; 2024 FieldZone Booking </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
