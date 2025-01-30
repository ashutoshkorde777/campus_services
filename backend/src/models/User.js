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
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;