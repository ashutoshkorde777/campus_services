import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import adminLogo from "../assets/admin-logo.png";
import studentLogo from "../assets/student-logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);

  return (
    <div className="login-container">
      <div className="main-login-box">
        {/* Admin Login Section */}
        <div className="login-section admin" onClick={() => navigate("/admin-login")}>
          <img src={adminLogo} alt="Admin Logo" className="login-logo" />
          <h2>Admin Login</h2>
          <p>Sign in as an administrator</p>
        </div>

        {/* User Login Section */}
        <div className="login-section student" onClick={() => setShowUserDropdown(!showUserDropdown)}>
          <img src={studentLogo} alt="Student Logo" className="login-logo" />
          <h2>User Login</h2>
          <p>Select your login type</p>

          {/* Dropdown for User Type Selection */}
          {showUserDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => setSelectedUserType("Student")}>Student</button>
              <button onClick={() => setSelectedUserType("Vendor")}>Vendor</button>
            </div>
          )}
        </div>
      </div>

      {/* Show Login & Create Account options only after selection */}
      {selectedUserType && (
        <div className="student-login-box">
          <div className={`login-section ${selectedUserType.toLowerCase()}`}>
            <h2>{selectedUserType}</h2>
            <div className="student-vendor-buttons">
              <button onClick={() => navigate(`/${selectedUserType.toLowerCase()}-login`)}>Login</button>
              <button onClick={() => navigate(`/${selectedUserType.toLowerCase()}-register`)}>Create Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
