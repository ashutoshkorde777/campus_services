const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders for a student
router.get('/student/:studentId', orderController.getOrdersByStudent);

// Get all orders for a service provider
router.get('/provider/:serviceProviderId', orderController.getOrdersByProvider);

// Get all orders for a service
router.get('/service/:serviceId', orderController.getOrdersByService);

// Update order status
router.put('/:orderId/status', orderController.updateOrderStatus);

module.exports = router;