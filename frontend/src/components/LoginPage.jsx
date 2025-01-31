import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [showUserTypeSelection, setShowUserTypeSelection] = useState('');
  const [userType, setUserType] = useState('');
  const [credentials, setCredentials] = useState({
    name: '', 
    email: '', 
    prn: '', 
    phone: '', 
    password: '', 
    businessDescription: '', 
    photo: null 
  });
  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    setShowUserTypeSelection(type);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFileChange = (e) => {
    setCredentials({ ...credentials, photo: e.target.files[0] });
  };

  const handleLogin = async () => {
    try {
      const identifier = userType === 'Student' ? credentials.prn : credentials.phone;

      const response = await axios.post('http://localhost:5000/api/auth/login', {
        userType,
        identifier,
        password: credentials.password
      });

      console.log('Login successful:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('userType', userType);
      formData.append('name', credentials.name);
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);
      formData.append('phone', userType === 'ServiceProvider' ? credentials.phone : null);
      if (userType === 'Student') {
        formData.append('prn', credentials.prn);
      }
      formData.append('businessDescription', userType === 'ServiceProvider' ? credentials.businessDescription : null);
      if (userType === 'ServiceProvider') formData.append('photo', credentials.photo);

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      
  
      const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      console.log('Registration successful:', response.data);
  
      // Navigate to Login page after successful registration
      navigate('/');
      // Reset the user type selection to show the login form
      setShowUserTypeSelection('login');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };
  


  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome</h2>
        <p>Please choose an option:</p>
        <div className="login-options">
          <button onClick={() => handleButtonClick('login')}>Login</button>
          <button onClick={() => handleButtonClick('register')}>Register</button>
        </div>

          <div className="login-selection">
            <select value={userType} onChange={handleUserTypeChange}>
              <option value="">Select User Type</option>
              <option value="Student">Student</option>
              <option value="ServiceProvider">ServiceProvider</option>
            </select>
          </div>
          {showUserTypeSelection === 'login' && userType && (
          <div className="login-input">
          {userType === 'Student' && (
            <input
              type="text"
              name="prn"
              placeholder="PRN"
              value={credentials.prn}
              onChange={handleInputChange}
            />
          )}
          {userType === 'ServiceProvider' && (
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={credentials.phone}
              onChange={handleInputChange}
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
          />
          </div>
          
          
        )}

        {showUserTypeSelection =='register' && userType && (
          <div className="credentials-input">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={credentials.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleInputChange}
            />
            {userType === 'Student' && (
              <>
                <input
                  type="text"
                  name="prn"
                  placeholder="PRN"
                  value={credentials.prn}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={credentials.phone}
                  onChange={handleInputChange}
                />
              </>
            )}
            {userType === 'ServiceProvider' && (
              <>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={credentials.phone}
                  onChange={handleInputChange}
                />
                <textarea
                  name="businessDescription"
                  placeholder="Business Description"
                  value={credentials.businessDescription}
                  onChange={handleInputChange}
                />
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                />
              </>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
        )}

        {showUserTypeSelection === 'login' && userType && (
          <button onClick={handleLogin}>Submit Login</button>
        )}
        {showUserTypeSelection === 'register' && userType && (
          <button onClick={handleRegister}>Submit Register</button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
