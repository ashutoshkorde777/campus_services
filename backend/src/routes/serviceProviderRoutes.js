const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { getServices, addService, updateService, getAllServiceProviders } = require('../controllers/serviceProviderController');
const authenticateToken = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });
// Routes
router.get('/services/:providerId', getServices); // Get all services for the service provider
router.post('/services', authenticateToken, upload.single('image'), addService);
 // Add a new service with image upload
router.put('/services', upload.single('image'), updateService); // Update an existing service with image upload

// Route to get all service providers
router.get('/providers', getAllServiceProviders);

module.exports = router;
