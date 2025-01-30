// src/Navbar.jsx
import React from 'react';
import { LiaConnectdevelop } from 'react-icons/lia'; // Import the ConnectDevelop icon
import { CgProfile } from 'react-icons/cg'; // Import the Profile icon
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">
        <LiaConnectdevelop size={30} style={{ marginRight: '10px' }} />
        <h2>Campus Connect</h2>
      </div>
      <div className="navbar-right">
        <CgProfile size={30} /> {/* Profile icon with size */}
      </div>
    </div>
  );
};

export default Navbar;
