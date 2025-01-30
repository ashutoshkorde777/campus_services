const Service = require('../models/service');
const User = require('../models/User');

// Get all services for a service provider
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.user.id });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new service
exports.addService = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const service = new Service({
      name,
      description,
      price,
      stock,
      providerId: req.user.id, // Get the provider ID from the logged-in user
    });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a service (service charge, stock)
exports.updateService = async (req, res) => {
  try {
    const { serviceId, price, stock } = req.body;
    const service = await Service.findOneAndUpdate(
      { _id: serviceId, providerId: req.user.id },
      { price, stock, updatedAt: Date.now() },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all service providers
exports.getAllServiceProviders = async (req, res) => {
  try {
    // Check if the logged-in user is a student
    if (req.user.userType !== 'Student') {
      return res.status(403).json({ message: 'Access denied. Only students can view service providers.' });
    }

    const serviceProviders = await User.find({ userType: 'ServiceProvider' }).select('-password');
    res.json(serviceProviders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
