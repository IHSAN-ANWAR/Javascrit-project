const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5001;

const fs = require('fs');
const path = require('path');

// File-based storage for persistence
const usersFile = path.join(__dirname, 'users.json');

// Load existing users or create empty array
let users = [];
try {
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  }
} catch (error) {
  console.log('Creating new users file...');
  users = [];
}

// Save users to file
const saveUsers = () => {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

const gifts = [
  {
    _id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '2',
    name: 'Artisan Coffee Gift Set',
    price: 45.00,
    category: 'Food & Beverage',
    description: 'Premium coffee beans from around the world with a beautiful ceramic mug.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '3',
    name: 'Luxury Skincare Bundle',
    price: 120.00,
    category: 'Beauty',
    description: 'Complete skincare routine with organic ingredients and elegant packaging.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '4',
    name: 'Smart Fitness Tracker',
    price: 199.99,
    category: 'Electronics',
    description: 'Track your health and fitness goals with this advanced wearable device.',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '5',
    name: 'Handcrafted Leather Wallet',
    price: 65.00,
    category: 'Accessories',
    description: 'Genuine leather wallet with RFID protection and multiple card slots.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '6',
    name: 'Vintage Polaroid Camera',
    price: 89.99,
    category: 'Electronics',
    description: 'Instant camera for capturing memories with that classic vintage look.',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '7',
    name: 'Gourmet Chocolate Collection',
    price: 35.00,
    category: 'Food & Beverage',
    description: 'Assorted premium chocolates from renowned chocolatiers around the world.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '8',
    name: 'Silk Scarf Set',
    price: 55.00,
    category: 'Fashion',
    description: 'Elegant silk scarves with beautiful patterns, perfect for any season.',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '9',
    name: 'Essential Oil Diffuser',
    price: 42.99,
    category: 'Home & Garden',
    description: 'Ultrasonic aromatherapy diffuser with LED lights and timer settings.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '10',
    name: 'Bestseller Book Bundle',
    price: 28.50,
    category: 'Books',
    description: 'Collection of three current bestselling novels across different genres.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '11',
    name: 'Wireless Charging Pad',
    price: 24.99,
    category: 'Electronics',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '12',
    name: 'Organic Tea Sampler',
    price: 32.00,
    category: 'Food & Beverage',
    description: 'Variety pack of organic teas including green, black, herbal, and chai blends.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '13',
    name: 'Bamboo Cutting Board Set',
    price: 39.99,
    category: 'Home & Garden',
    description: 'Eco-friendly bamboo cutting boards in three sizes with built-in compartments.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '14',
    name: 'Yoga Mat & Block Set',
    price: 67.50,
    category: 'Sports & Fitness',
    description: 'Non-slip yoga mat with matching blocks and carrying strap.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '15',
    name: 'Personalized Photo Album',
    price: 29.99,
    category: 'Accessories',
    description: 'Custom photo album with leather cover and gold embossing options.',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '16',
    name: 'Smart Plant Monitor',
    price: 49.99,
    category: 'Home & Garden',
    description: 'Monitor soil moisture, light, and temperature for your plants via smartphone app.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '17',
    name: 'Artisan Soap Collection',
    price: 22.00,
    category: 'Beauty',
    description: 'Handmade soaps with natural ingredients and essential oils.',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '18',
    name: 'Bluetooth Speaker',
    price: 59.99,
    category: 'Electronics',
    description: 'Portable waterproof speaker with 12-hour battery life and rich sound.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '19',
    name: 'Craft Beer Tasting Kit',
    price: 48.00,
    category: 'Food & Beverage',
    description: 'Selection of craft beers from local breweries with tasting notes.',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop',
    createdAt: new Date()
  },
  {
    _id: '20',
    name: 'Cashmere Throw Blanket',
    price: 95.00,
    category: 'Home & Garden',
    description: 'Luxuriously soft cashmere throw blanket in neutral colors.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    createdAt: new Date()
  }
];

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'GiftLink API is running' });
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    console.log('Registration attempt:', { username, email });
    
    // Check if user already exists
    const existingUser = users.find(user => 
      user.email === email || user.username === username
    );
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    users.push(newUser);
    saveUsers(); // Save to file
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, username },
      'test_secret',
      { expiresIn: '24h' }
    );
    
    console.log('User registered successfully:', username);
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser.id, username, email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', email);
    
    // Find user
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      'test_secret',
      { expiresIn: '24h' }
    );
    
    console.log('User logged in successfully:', user.username);
    
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Gift endpoints
app.get('/api/gifts', (req, res) => {
  console.log('Fetching all gifts');
  res.json(gifts);
});

app.get('/api/gifts/:id', (req, res) => {
  const { id } = req.params;
  console.log('Fetching gift with ID:', id);
  
  const gift = gifts.find(g => g._id === id);
  
  if (!gift) {
    return res.status(404).json({ error: 'Gift not found' });
  }
  
  res.json(gift);
});

// Search endpoint
app.get('/api/gifts/search', (req, res) => {
  const { category, name, minPrice, maxPrice } = req.query;
  console.log('Searching gifts with filters:', { category, name, minPrice, maxPrice });
  
  let filteredGifts = gifts;
  
  if (category) {
    filteredGifts = filteredGifts.filter(gift => 
      gift.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (name) {
    filteredGifts = filteredGifts.filter(gift => 
      gift.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  
  if (minPrice) {
    filteredGifts = filteredGifts.filter(gift => gift.price >= parseFloat(minPrice));
  }
  
  if (maxPrice) {
    filteredGifts = filteredGifts.filter(gift => gift.price <= parseFloat(maxPrice));
  }
  
  res.json(filteredGifts);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GiftLink Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log('Registration and gift browsing working with file-based storage');
  console.log(`📦 Sample gifts loaded: ${gifts.length} items`);
  console.log(`👥 Existing users loaded: ${users.length} users`);
});