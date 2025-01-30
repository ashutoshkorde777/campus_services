const express = require("express");
const userController = require('../controllers/userController');

const router = express.Router();

router.get("/", userController.getAllUsers);

// Route for creating a new user
router.post('/create', userController.createUser);

// Route for fetching a user by email or PRN
router.get('/get', userController.getUser);

// Route for updating a user by email or PRN
router.put('/update', userController.updateUser);

// Route for deleting a user by email or PRN
router.delete('/delete', userController.deleteUser);

module.exports = router;


module.exports = router;
