const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Import orderRoutes
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
  }));
  
app.use(express.json()); // Middleware for JSON parsing

app.use('/api/users', userRoutes);
app.use('/api/service-provider', serviceProviderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes); // Use orderRoutes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));