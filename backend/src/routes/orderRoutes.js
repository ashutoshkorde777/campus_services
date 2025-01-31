const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define your order routes here
router.get('/', (req, res) => {
  res.send('Order route');
});

// Get all orders for a student
router.get('/student/:studentId', orderController.getOrdersByStudent);

// Get all orders for a service provider
router.get('/provider/:serviceProviderId', orderController.getOrdersByProvider);

// Get all orders for a service
router.get('/service/:serviceId', orderController.getOrdersByService);

// Update order status
router.put('/:orderId/status', orderController.updateOrderStatus);

// Add a new order (POST route)
router.post('/', orderController.createOrder); // Added POST route for creating orders


module.exports = router;