'use client';
import { useState } from 'react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Maak een account aan
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Vul je gegevens in om te beginnen
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <label htmlFor="naam" className="block text-sm font-medium text-gray-700 mb-1">
                Volledige naam
              </label>
              <input
                id="naam"
                name="naam"
                type="text"
                required
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Voer je volledige naam in"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mailadres
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="voer@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="wachtwoord" className="block text-sm font-medium text-gray-700 mb-1">
                Wachtwoord
              </label>
              <input
                id="wachtwoord"
                name="wachtwoord"
                type="password"
                required
                value={wachtwoord}
                onChange={(e) => setWachtwoord(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Minimaal 4 karakters"
                minLength="4"
              />
            </div>
            
            <div>
              <label htmlFor="bevestigWachtwoord" className="block text-sm font-medium text-gray-700 mb-1">
                Bevestig wachtwoord
              </label>
              <input
                id="bevestigWachtwoord"
                name="bevestigWachtwoord"
                type="password"
                required
                value={bevestigWachtwoord}
                onChange={(e) => setBevestigWachtwoord(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Herhaal je wachtwoord"
              />
            </div>
          </div>

          {melding && (
            <div className={`p-3 rounded-md text-sm ${
              meldingType === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {melding}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Account aanmaken...
                </span>
              ) : (
                'Account aanmaken'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Heb je al een account?{' '}
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Log hier in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
