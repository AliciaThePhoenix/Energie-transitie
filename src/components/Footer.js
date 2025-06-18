export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-brand">
              <div className="footer-logo">
                <svg className="footer-logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="footer-brand-text">EcoSmart</span>
            </div>
            <p className="footer-description">
              Slimme energiebesparing voor je smart home.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Product</h3>
            <ul className="footer-links">
              <li><a href="#features" className="footer-link">Features</a></li>
              <li><a href="#" className="footer-link">Prijzen</a></li>
              <li><a href="#" className="footer-link">Integraties</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Documentatie</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Account</h3>
            <ul className="footer-links">
              <li><a href="/login" className="footer-link">Inloggen</a></li>
              <li><a href="/registreren" className="footer-link">Registreren</a></li>
              <li><a href="#" className="footer-link">Instellingen</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2024 EcoSmart. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
} 