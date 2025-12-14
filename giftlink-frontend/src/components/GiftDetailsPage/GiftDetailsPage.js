import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const GiftDetailsPage = () => {
  const { id } = useParams();
  const [gift, setGift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGiftDetails();
  }, [id]);

  const fetchGiftDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/gifts/${id}`);
      setGift(response.data);
    } catch (err) {
      setError('Gift not found or failed to load details.');
      console.error('Error fetching gift details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h2>Loading gift details...</h2>
      </div>
    );
  }

  if (error || !gift) {
    return (
      <div className="container">
        <div className="alert alert-error">
          {error}
        </div>
        <Link to="/main" className="btn btn-primary">
          ← Back to Gifts
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/main" className="btn btn-secondary" style={{ marginBottom: '24px' }}>
        ← Back to Gifts
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        <div>
          <div className="gift-image" style={{ height: '400px' }}>
            <img 
              src={gift.image || 'https://via.placeholder.com/400x400?text=No+Image'} 
              alt={gift.name}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />
          </div>
        </div>

        <div>
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>{gift.name}</h1>
          
          <div className="gift-price" style={{ fontSize: '32px', marginBottom: '16px' }}>
            ${gift.price}
          </div>

          <span className="gift-category" style={{ marginBottom: '24px' }}>
            {gift.category}
          </span>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ marginBottom: '12px' }}>Description</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
              {gift.description || 'This amazing gift is perfect for any occasion. High quality and carefully selected to bring joy to your loved ones.'}
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ marginBottom: '12px' }}>Features</h3>
            <ul style={{ paddingLeft: '20px', color: '#666' }}>
              <li>Premium quality materials</li>
              <li>Perfect for gift giving</li>
              <li>Suitable for all ages</li>
              <li>Fast and secure delivery</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-primary" style={{ flex: 1 }}>
              Add to Cart
            </button>
            <button className="btn btn-secondary">
              ♥ Save for Later
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '64px' }}>
        <h3 style={{ marginBottom: '24px' }}>Customer Reviews</h3>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ color: '#ffc107', marginRight: '8px' }}>★★★★★</div>
            <strong>Amazing Gift!</strong>
          </div>
          <p style={{ color: '#666' }}>
            "This gift was perfect for my friend's birthday. The quality exceeded my expectations and the delivery was super fast!"
          </p>
          <small style={{ color: '#999' }}>- Sarah M.</small>
        </div>
      </div>
    </div>
  );
};

export default GiftDetailsPage;