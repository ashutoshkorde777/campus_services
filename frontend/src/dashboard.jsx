import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ActionAreaCard from './components/ActionAreaCard';
import CanteenCard from './components/canteencard';
import ServiceProviderCard from './ServiceProviderCard'; // Import the new card component
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/service-providers');
        console.log('API Response:', response.data);
        setServiceProviders(response.data.serviceProviders || []); 
      } catch (error) {
        console.error('Error fetching service providers:', error);
        setServiceProviders([]); 
      }
    };
    fetchServiceProviders();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Navbar />
        <h1>Welcome</h1>
        <div className="card-container">
          <CanteenCard />
          <ActionAreaCard />
          {Array.isArray(serviceProviders) &&
            serviceProviders.map((provider) => (
              <ServiceProviderCard key={provider._id} provider={provider} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
