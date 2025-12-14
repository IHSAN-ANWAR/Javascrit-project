const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/giftlink';
const client = new MongoClient(uri);

let db;
let isConnected = false;

// In-memory fallback storage
const memoryStorage = {
  users: [],
  gifts: []
};

// Mock collection interface for in-memory storage
class MockCollection {
  constructor(name) {
    this.name = name;
    this.data = memoryStorage[name] || [];
  }

  async findOne(query) {
    if (query.$or) {
      return this.data.find(item => 
        query.$or.some(condition => 
          Object.keys(condition).every(key => item[key] === condition[key])
        )
      );
    }
    return this.data.find(item => 
      Object.keys(query).every(key => item[key] === query[key])
    );
  }

  async insertOne(doc) {
    const id = Date.now().toString();
    const newDoc = { ...doc, _id: id };
    this.data.push(newDoc);
    return { insertedId: id };
  }

  async find(query = {}) {
    const results = this.data.filter(item =>
      Object.keys(query).every(key => item[key] === query[key])
    );
    return { toArray: async () => results };
  }
}

// Mock database interface
class MockDatabase {
  collection(name) {
    return new MockCollection(name);
  }
}

async function connectToDatabase() {
  try {
    if (!isConnected) {
      try {
        await client.connect();
        console.log('Connected to MongoDB successfully');
        db = client.db('giftlink');
        isConnected = true;
      } catch (error) {
        console.log('MongoDB not available, using in-memory storage for development');
        db = new MockDatabase();
        isConnected = true;
      }
    }
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

function getDatabase() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return db;
}

module.exports = {
  connectToDatabase,
  getDatabase,
  client
};