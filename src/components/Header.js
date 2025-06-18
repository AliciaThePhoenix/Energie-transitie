'use client';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-brand">
            <div className="logo">
              <svg className="logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="brand-text">EcoSmart</span>
          </div>
          
          <div className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="/login" className="nav-link">Inloggen</a>
            <a href="/registreren" className="nav-button">Start gratis</a>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-toggle"
            >
              <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <a href="/" className="mobile-nav-link">Home</a>
            <a href="#features" className="mobile-nav-link">Features</a>
            <a href="/login" className="mobile-nav-link">Inloggen</a>
            <a href="/registreren" className="mobile-nav-button">Start gratis</a>
          </div>
        </div>
      )}
    </nav>
  );
} 