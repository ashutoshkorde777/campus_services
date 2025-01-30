const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
    enum: ['Student', 'ServiceProvider']
  },
  prn: {
    type: Number,
    unique: true,
    sparse: true,// Only enforce uniqueness if the field is not null
    minlength: 8,
    maxlength: 9
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
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10
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