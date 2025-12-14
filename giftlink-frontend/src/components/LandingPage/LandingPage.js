import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Find the Perfect Gift for Everyone</h1>
          <p>Discover amazing gifts for your loved ones with GiftLink</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/main" className="btn btn-primary">
              Browse Gifts
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-secondary">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Why Choose GiftLink?</h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              We make gift-giving simple and meaningful
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
              <h3 style={{ marginBottom: '12px' }}>Curated Selection</h3>
              <p>Hand-picked gifts for every occasion and personality</p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ marginBottom: '12px' }}>Smart Search</h3>
              <p>Find the perfect gift with our advanced filtering system</p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💝</div>
              <h3 style={{ marginBottom: '12px' }}>Personal Touch</h3>
              <p>Add personal messages and customize your gift experience</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>Ready to Start Gift Hunting?</h2>
          <p style={{ fontSize: '18px', marginBottom: '32px', color: '#666' }}>
            Join thousands of happy gift-givers who found the perfect presents
          </p>
          <Link to="/main" className="btn btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>
            Explore Gifts Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;