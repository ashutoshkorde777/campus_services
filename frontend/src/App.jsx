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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
