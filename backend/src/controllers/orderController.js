const Order = require('../models/order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { listOfProducts, studentId, serviceProviderId, amount } = req.body;
    console.log(listOfProducts, studentId, serviceProviderId, amount);

    const order = new Order({
      listOfProducts,  // Add the list of products as per the schema
      studentId,
      serviceProviderId,
      amount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all orders for a student
exports.getOrdersByStudent = async (req, res) => {
  try {
    const orders = await Order.find({ studentId: req.params.studentId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all orders for a service provider
exports.getOrdersByProvider = async (req, res) => {
  try {
    const orders = await Order.find({ serviceProviderId: req.params.serviceProviderId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all orders for a service
exports.getOrdersByService = async (req, res) => {
  try {
    const orders = await Order.find({ "listOfProducts.service": req.params.serviceId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status, paymentStatus },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
