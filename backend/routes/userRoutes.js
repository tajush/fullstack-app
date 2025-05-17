
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const validateUser = require('../middleware/validateUser'); // 👈 import the middleware

// GET users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST user with middleware
router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add user' });
  }
});
module.exports = router;