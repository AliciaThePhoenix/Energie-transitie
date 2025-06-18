'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './index.css';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="landing-page">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Beheer je <span className="highlight">energieverbruik</span><br />
              met slimme inzichten
            </h1>
            <p className="hero-description">
              Ontdek hoe je energie bespaart met ons intelligente dashboard. 
              Vergelijk je verbruik, stel doelen en krijg real-time inzichten in je smart home.
            </p>
            <div className="hero-buttons">
              <a href="/registreren" className="primary-button">
                Start gratis
              </a>
              <a href="#features" className="secondary-button">
                Bekijk features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Wat kun je verwachten?
            </h2>
            <p className="features-subtitle">
              Ons smart home dashboard geeft je volledige controle over je energieverbruik
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card feature-blue">
              <div className="feature-icon blue-icon">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="feature-title">Real-time Verbruik</h3>
              <p className="feature-description">
                Bekijk je huidige energieverbruik in real-time. Zie direct hoeveel energie je op dit moment gebruikt.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card feature-green">
              <div className="feature-icon green-icon">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="feature-title">Vergelijkingen</h3>
              <p className="feature-description">
                Vergelijk je verbruik met vorige dagen, weken en maanden. Zie trends en patronen in je energiegebruik.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card feature-purple">
              <div className="feature-icon purple-icon">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Persoonlijke Doelen</h3>
              <p className="feature-description">
                Stel je eigen energiebesparingsdoelen in en krijg notificaties wanneer je ze bereikt.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card feature-red">
              <div className="feature-icon red-icon">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">24/7 Monitoring</h3>
              <p className="feature-description">
                Blijf altijd op de hoogte van je energieverbruik met continue monitoring en alerts.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card feature-teal">
              <div className="feature-icon teal-icon">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="feature-title">Gedetailleerde Rapportages</h3>
              <p className="feature-description">
                Krijg uitgebreide rapportages en analyses om je energieverbruik te optimaliseren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2 className="cta-title">
            Klaar om te beginnen?
          </h2>
          <p className="cta-description">
            Start vandaag nog met het besparen van energie en krijg volledige controle over je smart home.
          </p>
          <div className="cta-buttons">
            <a href="/registreren" className="cta-primary-button">
              Maak gratis account
            </a>
            <a href="/login" className="cta-secondary-button">
              Log in
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 