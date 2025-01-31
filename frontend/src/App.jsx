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
import Product from './Product'; // Import the Product page
import Queue from "./Queue";
import Ccproduct from "./Ccproduct"; // Import the CC Products page
import PrintService from './PrintService';
import Vendordashboard from './Vendordashboard';
import ServicesQueue from "./ServicesQueue";
import Stationeryqueue from "./Stationeryqueue";
import Servicesform from "./Servicesform";
import Studentorders from "./Studentorders";


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
          <Route path="/canteenProduct" element={<Product />} />  {/* Add the CC Route */}
          <Route path="/queue" element={<Queue />} />
          <Route path="/ccproducts" element={<Ccproduct />} />  {/* Add the CC Products Route */}
          <Route path="/print/" element={<PrintService />} />
          <Route path="/vendordashboard" element={<Vendordashboard />} />
          <Route path="/servicesqueue" element={<ServicesQueue />} />
          <Route path="/stationeryqueue" element={<Stationeryqueue />} />
          <Route path="/servicesform" element={<Servicesform />} />
          <Route path="/studentorders" element={<Studentorders />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;

