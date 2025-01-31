const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { getServices, addService, updateService, getAllServiceProviders } = require('../controllers/serviceProviderController');

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Set the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Set the file name with timestamp to avoid overwriting
  },
});

const upload = multer({ storage }); // Initialize multer with storage configuration

// Routes
router.get('/services', getServices); // Get all services for the service provider
router.post('/services', upload.single('image'), addService); // Add a new service with image upload
router.put('/services', upload.single('image'), updateService); // Update an existing service with image upload

// Route to get all service providers
router.get('/providers', getAllServiceProviders);

module.exports = router;
