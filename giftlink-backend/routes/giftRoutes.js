const express = require('express');
const { getDatabase, connectToDatabase } = require('../models/db');
const { ObjectId } = require('mongodb');

const router = express.Router();

// GET /api/gifts - Get all gifts
router.get('/', async (req, res) => {
  try {
    await connectToDatabase();
    const db = getDatabase();
    const gifts = await db.collection('gifts').find({}).toArray();
    res.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    res.status(500).json({ error: 'Failed to fetch gifts' });
  }
});

// GET /api/gifts/:id - Get gift by ID
router.get('/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const db = getDatabase();
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid gift ID' });
    }
    
    const gift = await db.collection('gifts').findOne({ _id: new ObjectId(id) });
    
    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }
    
    res.json(gift);
  } catch (error) {
    console.error('Error fetching gift:', error);
    res.status(500).json({ error: 'Failed to fetch gift' });
  }
});

// POST /api/gifts - Create new gift
router.post('/', async (req, res) => {
  try {
    await connectToDatabase();
    const db = getDatabase();
    const newGift = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('gifts').insertOne(newGift);
    res.status(201).json({ _id: result.insertedId, ...newGift });
  } catch (error) {
    console.error('Error creating gift:', error);
    res.status(500).json({ error: 'Failed to create gift' });
  }
});

module.exports = router;