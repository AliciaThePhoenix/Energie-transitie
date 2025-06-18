'use client';
import { useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import './auth.css';

export default function Login() {
  // Variabelen om de ingevoerde gegevens en status bij te houden
  const [email, setEmail] = useState('');           // Email die gebruiker invoert
  const [wachtwoord, setWachtwoord] = useState(''); // Wachtwoord die gebruiker invoert
  const [melding, setMelding] = useState('');       // Bericht dat wordt getoond (succes/fout)
  const [meldingType, setMeldingType] = useState(''); // Type bericht: 'success' of 'error'
  const [loading, setLoading] = useState(false);    // Of het formulier wordt verzonden

  // Functie die wordt uitgevoerd wanneer gebruiker op 'Inloggen' klikt
  const handleSubmit = async (e) => {
    e.preventDefault(); // Voorkom dat pagina herlaadt
    setLoading(true);   // Toon loading spinner
    setMelding('');     // Wis vorige berichten
    setMeldingType('');

    try {
      // Stuur inloggegevens naar de server
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, wachtwoord })
      });
      const data = await res.json();
      
      if (res.ok) {
        // Inloggen succesvol
        setMelding('Succesvol ingelogd! Je wordt doorgestuurd...');
        setMeldingType('success');
        setEmail('');      // Wis email veld
        setWachtwoord(''); // Wis wachtwoord veld
        // Hier kun je later redirecten naar dashboard of home pagina
        // router.push('/dashboard');
      } else {
        // Inloggen mislukt
        setMelding(data.error || 'Inloggen mislukt - controleer je gegevens');
        setMeldingType('error');
      }
    } catch (err) {
      // Server fout
      setMelding('Server fout - probeer het later opnieuw');
      setMeldingType('error');
    }
    setLoading(false); // Verberg loading spinner
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Header met logo en titel */}
        <AuthHeader 
          title="Log in op je account"
          subtitle="Voer je inloggegevens in"
        />
        
        {/* Inlogformulier */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email invoerveld */}
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
          
          {/* Wachtwoord invoerveld */}
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
              placeholder="Voer je wachtwoord in"
            />
          </div>

          {/* Toon succes of foutmelding */}
          {melding && (
            <div className={`message ${meldingType === 'success' ? 'message-success' : 'message-error'}`}>
              {melding}
            </div>
          )}

          {/* Inlog knop */}
          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? (
              // Toon loading spinner tijdens inloggen
              <span className="button-content">
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Inloggen...
              </span>
            ) : (
              'Inloggen'
            )}
          </button>

          {/* Links naar andere pagina's */}
          <div className="auth-links">
            <p className="auth-link-text">
              Heb je nog geen account?{' '}
              <a href="/registreren" className="auth-link">
                Registreer hier
              </a>
            </p>
            <p className="auth-link-text">
              <a href="/wachtwoord-vergeten" className="auth-link">
                Wachtwoord vergeten?
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 