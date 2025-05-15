const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Product Model Definition
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: String
});

const Product = mongoose.model('Product', productSchema);

// GET: Fetch products with filtering, sorting, and pagination
router.get('/products', async (req, res) => {
  try {
    const { category, sort, page = 1, limit = 10 } = req.query;

    let query = {};  // Initialize the query object

    // Apply category filter if provided
    if (category) {
      query.category = category;
    }

    let sortOptions = {};
    // Apply sorting if provided
    if (sort) {
      if (sort === 'price_asc') {
        sortOptions.price = 1; // Ascending order by price
      } else if (sort === 'price_desc') {
        sortOptions.price = -1; // Descending order by price
      }
    }

    // Fetch products with pagination and sorting
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort(sortOptions);

    // Check if products exist
    if (!products.length) {
      return res.status(404).json({ error: 'No products found' });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST: Add a new product
router.post('/products', [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').notEmpty().withMessage('Category is required')
], async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json({
      success: true,
      product: newProduct
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add product' });
  }
});

module.exports = router;
