const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // The charge for the service
  stock: { type: String, required: true }, 
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Linked to the service provider
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  image: { type: String, required: true }, // URL or path to the image
});

module.exports = mongoose.model('Service', serviceSchema);
