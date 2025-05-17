const express = require('express');
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// GET all images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST upload image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // ✅ Handle case where no file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newImage = new Image({
      title: req.body.title || '',
      imageUrl: `/uploads/${req.file.filename}`
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
