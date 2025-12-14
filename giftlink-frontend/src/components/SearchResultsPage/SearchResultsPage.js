import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    name: searchParams.get('name') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || ''
  });

  useEffect(() => {
    if (searchParams.toString()) {
      searchGifts();
    }
  }, [searchParams]);

  const searchGifts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await axios.get(`/api/gifts/search?${queryParams}`);
      setGifts(response.data);
    } catch (err) {
      setError('Failed to search gifts. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newSearchParams.append(key, value);
    });
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      name: '',
      minPrice: '',
      maxPrice: ''
    });
    setSearchParams({});
    setGifts([]);
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: '32px' }}>Search Gifts</h1>

      <div className="card" style={{ marginBottom: '32px' }}>
        <form onSubmit={handleSearch}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="name">Gift Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Search by name..."
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home & Garden</option>
                <option value="Sports">Sports & Outdoors</option>
                <option value="Toys">Toys & Games</option>
                <option value="Beauty">Beauty & Personal Care</option>
                <option value="Food">Food & Beverages</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="minPrice">Min Price ($)</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="0"
                min="0"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="maxPrice">Max Price ($)</label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="1000"
                min="0"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : '🔍 Search Gifts'}
            </button>
            <button type="button" onClick={clearFilters} className="btn btn-secondary">
              Clear Filters
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <h3>Searching for gifts...</h3>
        </div>
      ) : gifts.length === 0 && searchParams.toString() ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <h3>No gifts found</h3>
          <p>Try adjusting your search filters or browse all gifts.</p>
          <Link to="/main" className="btn btn-primary">
            Browse All Gifts
          </Link>
        </div>
      ) : gifts.length > 0 ? (
        <>
          <div style={{ marginBottom: '24px' }}>
            <h3>Found {gifts.length} gift{gifts.length !== 1 ? 's' : ''}</h3>
          </div>
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
        </>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <h3>Start Your Gift Search</h3>
          <p>Use the filters above to find the perfect gift, or browse all available gifts.</p>
          <Link to="/main" className="btn btn-primary">
            Browse All Gifts
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;