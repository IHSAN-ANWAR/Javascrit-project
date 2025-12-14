import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MainPage = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await axios.get(`${apiUrl}/api/gifts`);
      setGifts(response.data);
    } catch (err) {
      setError('Failed to load gifts. Please try again later.');
      console.error('Error fetching gifts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h2>Loading amazing gifts...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>
          Discover Amazing Gifts
        </h1>
        <p style={{ fontSize: '18px', color: '#666' }}>
          Browse our curated collection of perfect gifts for every occasion
        </p>
      </div>

      <div className="search-bar">
        <Link to="/search" className="btn btn-primary">
          🔍 Advanced Search
        </Link>
      </div>

      {gifts.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <h3>No gifts available yet</h3>
          <p>Check back soon for amazing gift options!</p>
        </div>
      ) : (
        <div className="gift-grid">
          {gifts.map((gift) => (
            <div key={gift._id} className="gift-card">
              <div className="gift-image">
                <img 
                  src={gift.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
                  alt={gift.name}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0'
                  }}
                />
              </div>
              <div className="gift-content">
                <h3 className="gift-title">{gift.name}</h3>
                <div className="gift-price">${gift.price}</div>
                <span className="gift-category">{gift.category}</span>
                <p style={{ color: '#666', marginBottom: '16px', fontSize: '14px' }}>
                  {gift.description}
                </p>
                <Link 
                  to={`/gift/${gift._id}`} 
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;