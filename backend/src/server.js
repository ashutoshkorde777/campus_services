const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Middleware for JSON parsing

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;


// Use Routes
app.use('/api/service-provider', serviceProviderRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
