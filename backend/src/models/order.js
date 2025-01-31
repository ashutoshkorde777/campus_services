const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  listOfProducts: [
    {
      service: { type: String , required: true },
      quantity: { type: Number, required: true }
    }
  ],
  studentId: { type: Number , required: true, default:1 },
  serviceProviderId: { type: Number, required: true, default:1 }, // Added field
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['paid', 'notpaid'], default: 'notpaid' },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('Order', orderSchema);