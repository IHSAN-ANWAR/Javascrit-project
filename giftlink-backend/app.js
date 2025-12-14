const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectToDatabase } = require('./models/db');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/gifts', giftRoutes);
app.use('/api/gifts/search', searchRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'GiftLink API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
async function startServer() {
  try {
    console.log('Starting GiftLink Backend...');
    await connectToDatabase();
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 GiftLink Backend running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log('Server is ready to accept connections');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    console.log('Starting server without database connection...');
    
    // Start server anyway for development
    app.listen(PORT, () => {
      console.log(`🚀 GiftLink Backend running on port ${PORT} (no database)`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    });
  }
}

startServer();