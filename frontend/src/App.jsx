<<<<<<< HEAD
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import CC from './cc'; // Import the CC page 
import Canteen from './Canteen'; // Import the Canteen page
import './App.css';
import './navbar.css';
import './sidebar.css';
import './dashboard.css';
import './canteen.css'; 
import './cc.css'; 
import Product from './Product'; // Import the Product page
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";
import VendorLogin from "./pages/VendorLogin";
import StudentRegister from "./pages/StudentRegister";
import VendorRegister from "./pages/VendorRegister";
import Dashboard from "./dashboard";
import CC from "./cc";
import Canteen from "./Canteen";
>>>>>>> a4a523490d05d88df1f735ab46e6b27f3e6906cb

import "./App.css";
import "./navbar.css";
import "./sidebar.css";
import "./dashboard.css";
import "./canteen.css";
import "./cc.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Dashboard />} />
          <Route path="/canteen" element={<Canteen />} />  Add the Canteen Route
          <Route path="/cc" element={<CC />} />  {/* Add the CC Route */}
          <Route path="/canteenProduct" element={<Product />} />  {/* Add the CC Route */}
          
          
=======
          {/* Authentication Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/student-register" element={<StudentRegister />} />
          <Route path="/vendor-register" element={<VendorRegister />} />

          {/* Main App Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/canteen" element={<Canteen />} />
          <Route path="/cc" element={<CC />} />
>>>>>>> a4a523490d05d88df1f735ab46e6b27f3e6906cb
        </Routes>
      </div>
    </Router>
  );
};

export default App;
