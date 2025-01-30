const User = require('../models/User');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, PRN } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      role,
      PRN,
    });

    // Save the new user
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Get a user by email or PRN
const getUser = async (req, res) => {
  try {
    const { email, PRN } = req.query;

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (PRN) {
      user = await User.findOne({ PRN });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// Update a user by email or PRN
const updateUser = async (req, res) => {
  try {
    const { email, PRN } = req.query;
    const { name, password, role, PRN: newPRN } = req.body;

    let user;
    if (email) {
      user = await User.findOneAndUpdate(
        { email },
        { name, password, role, PRN: newPRN },
        { new: true }
      );
    } else if (PRN) {
      user = await User.findOneAndUpdate(
        { PRN },
        { name, password, role, PRN: newPRN },
        { new: true }
      );
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// Delete a user by email or PRN
const deleteUser = async (req, res) => {
  try {
    const { email, PRN } = req.query;

    let user;
    if (email) {
      user = await User.findOneAndDelete({ email });
    } else if (PRN) {
      user = await User.findOneAndDelete({ PRN });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};


module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };