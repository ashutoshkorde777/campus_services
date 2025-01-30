// src/Canteen.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './canteen.css'; // Create this file for specific styles

const Canteen = () => {
  return (
    <div className="canteen-container">
      <Sidebar />
      <div className="content">
        <Navbar />
        <h1>Canteen Services</h1>
        <p>Order your favorite food here.</p>
        {/* Add more canteen-related content here */}
      </div>
    </div>
  );
};

export default Canteen;
