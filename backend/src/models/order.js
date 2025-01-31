const mongoose = require('mongoose');
const crypto = require('crypto');  // We will use this to generate a unique OTP

const orderSchema = new mongoose.Schema({
  listOfProducts: [
    {
      service: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  studentId: { type: Number, required: true, default: 1 },
  serviceProviderId: { type: Number, required: true, default: 1 }, // Added field
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['paid', 'notpaid'], default: 'notpaid' },
  amount: { type: Number, required: true },
  otp: { type: String }, // OTP field added
});

// Pre-save middleware to generate OTP before saving the order
orderSchema.pre('save', function (next) {
  // Generate a 6-digit OTP using crypto
  if (this.isNew) {
    const otp = crypto.randomBytes(3).toString('hex');  // Generates a 6-character OTP
    this.otp = otp;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
