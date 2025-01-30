// src/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './sidebar.css';  // Import sidebar styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Sidebar Links */}
      <ul className="sidebar-links">
        <li><Link to="/">Services</Link></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
