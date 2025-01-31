import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import UserContext from '../UserContext';
import backgroundImage from '../assets/graphics.png';

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
  const { initializeUser } = useContext(UserContext); // Access the setUser function from UserContext
  const {user} = useContext(UserContext);

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
    const file = e.target.files[0];
    setCredentials({ ...credentials, photo: file });
  };

  const handleLogin = async () => {
    try {
      const identifier = userType === 'Student' ? credentials.prn : credentials.phone;

      const response = await axios.post('http://localhost:5000/api/auth/login', {
        userType,
        identifier,
        password: credentials.password
      });

      const temp = await initializeUser(response.data);

      console.log('Login successful:', response.data);
      if(user.roleType !== "Student"){
        navigate('/queue');
      }else{
        navigate('/dashboard');
      }
      
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
      navigate('/'); // Redirect to login after successful registration
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
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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

        {showUserTypeSelection === 'register' && userType && (
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
              <div>
                <label>PRN:</label>
                <input
                  type="text"
                  value={credentials.prn || ''}
                  onChange={(e) => setCredentials({ ...credentials, prn: e.target.value })}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={credentials.phone}
                  onChange={handleInputChange}
                />
              </div>
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
                  id="photoInput"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="photoInput" className="choose-image-label">Choose an Image</label>

                {/* Image Preview */}
                {credentials.photo && (
                  <div className="image-preview">
                    <img 
                      src={URL.createObjectURL(credentials.photo)} 
                      alt="Preview" 
                      style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                  </div>
                )}
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
