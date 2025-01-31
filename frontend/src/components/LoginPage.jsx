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
    password: '',
    prn: '',  
    phone: '', 
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
      formData.append('phone', credentials.phone);

      if (userType === 'Student') {
        if (!credentials.prn) {
          alert('PRN is required for Student registration');
          return;  // Stop form submission if PRN is missing
        }
        formData.append('prn', credentials.prn);
      }

      if (userType === 'ServiceProvider') {
        if (!credentials.businessDescription || !credentials.photo) {
          alert('Business Description and Photo are required for ServiceProvider registration');
          return;  // Stop form submission if either is missing
        }
        formData.append('businessDescription', credentials.businessDescription);
        formData.append('photo', credentials.photo);  // Assuming you are handling file input
      }

      const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Registration successful:', response.data);
      setShowUserTypeSelection('login');
      setCredentials({
        name: '', 
        email: '',
        password: '',
        prn: '',  
        phone: '', 
        businessDescription: '', 
        photo: null 
      });
      setError('Registration successful. Please log in.');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : error.message);
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
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="">Select User Type</option>
          <option value="Student">Student</option>
          <option value="ServiceProvider">Service Provider</option>
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
               <div>
    <label>PRN:</label>
    <input
      type="text"
      value={credentials.prn || ''}
      onChange={(e) => setCredentials({ ...credentials, prn: e.target.value })}
      required={userType === 'Student'}
    />
  </div>
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
