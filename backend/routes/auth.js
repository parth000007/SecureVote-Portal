const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// @desc    Register a new voter (or Admin)
// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { voterId, password, role } = req.body;
    
    // Check if voter already exists
    const userExists = await User.findOne({ voterId });
    if (userExists) {
      return res.status(400).json({ message: 'Voter ID already registered' });
    }

    const user = await User.create({
      voterId,
      password,
      role: role || 'VOTER' // Allow specifying role, although in real app Admin would be pre-seeded
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        voterId: user.voterId,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { voterId, password } = req.body;
    
    const user = await User.findOne({ voterId });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        voterId: user.voterId,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid voter ID or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
