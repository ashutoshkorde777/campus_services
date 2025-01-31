const express = require('express');
const { registerUser, loginUser, getServiceProviders } = require('../controllers/authController');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/register', upload.single('photo'), registerUser);
router.post('/login', loginUser);
router.get('/service-providers', getServiceProviders);

module.exports = router;