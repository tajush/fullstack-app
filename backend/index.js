const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes'); // Import productRoutes
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const galleryRoutes = require('./routes/galleryRoutes');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
// Serve static files from uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/gallery', galleryRoutes);
// Register the product routes and user routes
app.use('/api/products', productRoutes); // All product routes prefixed with /api
app.use('/api/users', userRoutes);    // All user routes prefixed with /api


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Error connecting to MongoDB: ', err));

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Set server port and start listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
