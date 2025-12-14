import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import GiftDetailsPage from './components/GiftDetailsPage/GiftDetailsPage';
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/gift/:id" element={<GiftDetailsPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;