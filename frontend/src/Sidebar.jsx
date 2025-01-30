// src/Sidebar.jsx
import React from 'react';
import './sidebar.css';  // Import sidebar styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* The links and content */}
      <ul className="sidebar-links">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Menu</a></li>
        <li><a href="#">Sales</a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
