const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes'); // Import productRoutes
const userRoutes = require('./routes/userRoutes'); // Import userRoutes

const app = express();
app.use(cors());
app.use(express.json());

// Register the product routes and user routes
app.use('/api', productRoutes); // All product routes prefixed with /api
app.use('/api', userRoutes);    // All user routes prefixed with /api


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
