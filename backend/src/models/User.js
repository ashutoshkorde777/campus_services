const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
    enum: ['Student', 'ServiceProvider']
  },
  prn: {
    type: String,
    unique: true,
    sparse: true // Only enforce uniqueness if the field is not null
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  businessDescription: {
    type: String,
    required: function() { return this.userType === 'ServiceProvider'; } // Required only for Service Providers
  },
  photo: {
    type: String // Field to store the photo path
  }
});

userSchema.pre('save', async function (next) {
  try {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
} catch (err) {
  next(err); // Pass error to the next middleware
}
});

// Compare stored and entered passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (err) {
    throw new Error('Error comparing passwords');
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;