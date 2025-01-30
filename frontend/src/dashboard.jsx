// src/Dashboard.jsx
import React from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import Navbar from './Navbar'; // Import Navbar component

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Navbar />
        <h1>Welcome</h1>
        {/* Your other content */}
      </div>
    </div>
  );
};

export default Dashboard;
