const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true }, // Custom ID field
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // The charge for the service
  stock: { type: String, required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Linked to the service provider
  requiresFiles: { type: Boolean, default: false }, // New field to specify if the service requires files
  category: { type: String, required: true, enum: ['Service', 'Item'] }, // New field to specify the category
  image: { type: String }, // New field to store the image path
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', serviceSchema);
