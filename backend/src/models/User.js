const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: [true, 'User type is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  prn: {
    type: String,
    required: function () {
      return this.userType === 'Student'; // Only required for Student
    },
  },
  businessDescription: {
    type: String,
    required: function () {
      return this.userType === 'ServiceProvider'; // Only required for ServiceProvider
    },
  },
  photo: {
    type: String,
    required: function () {
      return this.userType === 'ServiceProvider'; // Only required for ServiceProvider
    },
  },
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