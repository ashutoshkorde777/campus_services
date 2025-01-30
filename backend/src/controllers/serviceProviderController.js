const Service = require('../models/service');
const User = require('../models/User');

// Get all services for a service provider
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.user._id });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new service
exports.addService = async (req, res) => {
  try {
    const { customId, name, description, price, stock, requiresFiles, category } = req.body;
    const image = req.file ? req.file.path : null;

    const service = new Service({
      customId,
      name,
      description,
      price,
      stock,
      requiresFiles, // Include the new field
      category, // Include the new field
      image, // Include the image path
      providerId: req.user._id, // Get the provider ID from the logged-in user
    });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const { customId, name, description, price, stock, requiresFiles, category } = req.body;
    const image = req.file ? req.file.path : null;

    // Find the service by custom ID
    const service = await Service.findOne({ customId });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Ensure that only the service provider who created the service can update it
    if (service.providerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this service' });
    }

    // Update the service fields
    service.name = name || service.name;
    service.description = description || service.description;
    service.price = price || service.price;
    service.stock = stock || service.stock;
    service.requiresFiles = requiresFiles !== undefined ? requiresFiles : service.requiresFiles;
    service.category = category || service.category;
    service.image = image || service.image;

    // Save the updated service
    const updatedService = await service.save();
    res.json(updatedService);
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

    // Find all service providers and select only the name, businessDescription, and photo fields
    const serviceProviders = await User.find({ userType: 'ServiceProvider' }).select('name businessDescription photo');
    res.json(serviceProviders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
