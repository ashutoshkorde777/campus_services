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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/canteen" element={<Canteen />} />  {/* Add the Canteen Route */}
          <Route path="/cc" element={<CC />} />  {/* Add the CC Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;