import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ActionAreaCard from './components/ActionAreaCard'; // Import the card component
import CanteenCard from './components/canteencard'; // Import the card component
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">  {/* Use the "content" class here */}
        <Navbar />
        <h1>Welcome</h1>
        {/* Container for desktop cards */}
        <div className="card-container">
          <CanteenCard />
          <ActionAreaCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
