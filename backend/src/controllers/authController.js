const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register User
exports.registerUser = async (req, res) => {
  const { userType, prn, email, name, password, phone, businessDescription } = req.body;
  const photo = req.file ? req.file.path : null;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      userType,
      prn: userType === 'Student' ? prn : null,
      email,
      name,
      password,
      phone,
      businessDescription: userType === 'ServiceProvider' ? businessDescription : null,
      photo: userType === 'ServiceProvider' ? photo : null
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        userType: user.userType,
        email: user.email,
        name: user.name,
        phone: user.phone,
        businessDescription: user.businessDescription,
        photo: user.photo,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { userType, identifier, password } = req.body;

  try {
    const user = await User.findOne(
      userType === 'Student' ? { prn: identifier } : { phone: identifier }
    );

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        userType: user.userType,
        email: user.email,
        name: user.name,
        phone: user.phone,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
