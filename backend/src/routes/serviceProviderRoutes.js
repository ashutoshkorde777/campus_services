const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllServiceProviders } = require('../controllers/serviceProviderController');

// Route to get all service providers
router.get('/providers', protect, getAllServiceProviders);

module.exports = router;