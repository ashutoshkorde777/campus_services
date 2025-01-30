const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceProviderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Added field
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['paid', 'notpaid'], default: 'notpaid' },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('Order', orderSchema);