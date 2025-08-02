const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // emër i qartë dhe i saktë

// Register / Sign Up
router.post('/signup', async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(200).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ error: 'Registration failed' });
  }
});

// Login / Sign In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

        // Return full user object including role
    res.status(200).json({ 
      message: 'Signin successful', 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
