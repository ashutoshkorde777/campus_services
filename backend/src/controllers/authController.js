const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


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

    // Hash password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userType,
      prn: userType === 'Student' ? prn : null,
      email,
      name,
      password: hashedPassword,  // Save the hashed password
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
    console.error("Error during registration:", error);  // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { userType, identifier, password } = req.body;

  if (!identifier || !password || !userType) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log(`Login attempt with identifier: ${identifier} and userType: ${userType}`);

  try {
    const query = userType === 'Student' ? { prn: identifier } : { phone: identifier };
    console.log(`Searching for user with query:`, query);

    const user = await User.findOne(query);

    if (!user) {
      console.log(`User not found with identifier: ${identifier}`);
      return res.status(401).json({ message: 'Invalid identifier' });
    }

    const isMatch = await user.matchPassword(password);
    if (isMatch) {
      res.json({
        _id: user._id,
        userType: user.userType,
        email: user.email,
        name: user.name,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      console.log(`Invalid password for user with identifier: ${identifier}`);
      res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
