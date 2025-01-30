// filepath: /C:/Users/Lenovo/OneDrive/Documents/GitHub/campus_services/backend/src/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Middleware for JSON parsing

// CORS configuration
app.use(cors({ origin: "http://localhost:5173" }));

app.use('/api/users', userRoutes);
app.use('/api/service-provider', serviceProviderRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));