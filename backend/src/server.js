const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const path = require('path'); // Import path
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Import orderRoutes


dotenv.config();
connectDB();

const app = express();
app.use(cors()); // Use cors middleware
app.use(express.json()); // Middleware for JSON parsing

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes); // Use orderRoutes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));