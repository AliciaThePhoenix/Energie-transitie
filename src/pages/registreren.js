'use client';
import { useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import './auth.css';

export default function Registratie() {
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [bevestigWachtwoord, setBevestigWachtwoord] = useState('');
  const [melding, setMelding] = useState('');
  const [meldingType, setMeldingType] = useState(''); // 'success' of 'error'
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMelding('');
    setMeldingType('');

    // Client-side validatie
    if (wachtwoord !== bevestigWachtwoord) {
      setMelding('Wachtwoorden komen niet overeen');
      setMeldingType('error');
      setLoading(false);
      return;
    }

    if (wachtwoord.length < 4) {
      setMelding('Wachtwoord moet minimaal 4 karakters lang zijn');
      setMeldingType('error');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/registreer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ naam, email, wachtwoord })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMelding('Account succesvol aangemaakt! Je kunt nu inloggen.');
        setMeldingType('success');
        setNaam('');
        setEmail('');
        setWachtwoord('');
        setBevestigWachtwoord('');
      } else {
        setMelding(data.error || 'Er is iets misgegaan bij het registreren');
        setMeldingType('error');
      }
    } catch (err) {
      setMelding('Server fout - probeer het later opnieuw');
      setMeldingType('error');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <AuthHeader 
          title="Maak een account aan"
          subtitle="Vul je gegevens in om te beginnen"
        />
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="naam" className="form-label">
              Volledige naam
            </label>
            <input
              id="naam"
              name="naam"
              type="text"
              required
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              className="form-input"
              placeholder="Voer je volledige naam in"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              E-mailadres
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="voer@email.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="wachtwoord" className="form-label">
              Wachtwoord
            </label>
            <input
              id="wachtwoord"
              name="wachtwoord"
              type="password"
              required
              value={wachtwoord}
              onChange={(e) => setWachtwoord(e.target.value)}
              className="form-input"
              placeholder="Minimaal 4 karakters"
              minLength="4"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bevestigWachtwoord" className="form-label">
              Bevestig wachtwoord
            </label>
            <input
              id="bevestigWachtwoord"
              name="bevestigWachtwoord"
              type="password"
              required
              value={bevestigWachtwoord}
              onChange={(e) => setBevestigWachtwoord(e.target.value)}
              className="form-input"
              placeholder="Herhaal je wachtwoord"
            />
          </div>

          {melding && (
            <div className={`message ${meldingType === 'success' ? 'message-success' : 'message-error'}`}>
              {melding}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? (
              <span className="button-content">
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Account aanmaken...
              </span>
            ) : (
              'Account aanmaken'
            )}
          </button>

          <div className="auth-links">
            <p className="auth-link-text">
              Heb je al een account?{' '}
              <a href="/login" className="auth-link">
                Log hier in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
