const express = require('express');
const { getDatabase, connectToDatabase } = require('../models/db');

const router = express.Router();

// GET /api/gifts/search - Search gifts with filters
router.get('/', async (req, res) => {
  try {
    await connectToDatabase();
    const db = getDatabase();
    const { category, name, minPrice, maxPrice } = req.query;
    
    let filter = {};
    
    // Filter by category
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    // Filter by name
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    const gifts = await db.collection('gifts').find(filter).toArray();
    res.json(gifts);
  } catch (error) {
    console.error('Error searching gifts:', error);
    res.status(500).json({ error: 'Failed to search gifts' });
  }
});

module.exports = router;