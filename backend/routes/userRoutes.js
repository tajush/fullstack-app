const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define or import the User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
}));

// GET: fetch users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ✅ POST: add new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add user' });
  }
});

module.exports = router;
