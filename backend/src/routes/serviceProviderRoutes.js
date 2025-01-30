const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { getServices, addService, updateService, getAllServiceProviders } = require('../controllers/serviceProviderController');

// Routes
router.get('/services', protect, getServices); // Get all services for the service provider
router.post('/services', protect, upload, addService); // Add a new service with image upload
router.put('/services', protect, upload, updateService); // Update an existing service with image upload

// Route to get all service providers
router.get('/providers', protect, getAllServiceProviders);

module.exports = router;