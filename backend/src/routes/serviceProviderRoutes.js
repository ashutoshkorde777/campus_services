const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getServices, addService, updateService } = require('../controllers/serviceProviderController');

// Routes
router.get('/services', protect, getServices); // Get all services for the service provider
router.post('/services', protect, addService); // Add a new service
router.put('/services', protect, updateService); // Update an existing service

module.exports = router;