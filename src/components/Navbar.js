// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles.css'; // Make sure to create this CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><NavLink to="/" exact className="navbar-link" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/booking" className="navbar-link" activeClassName="active">Booking Form</NavLink></li>
        <li><NavLink to="/bookings" className="navbar-link" activeClassName="active">Booking List</NavLink></li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
