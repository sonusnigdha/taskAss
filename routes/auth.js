const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Sign Up
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: 'User already exists' });

    user = new User({ username, email, password });
    await user.save();

    const payload = { user: { id: user._id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Log In
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { user: { id: user._id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
