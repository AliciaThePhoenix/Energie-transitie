export default function AuthHeader({ title, subtitle }) {
  return (
    <div className="auth-header">
      <div className="auth-logo">
        <svg className="auth-logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="auth-brand">EcoSmart</span>
      </div>
      <h2 className="auth-title">{title}</h2>
      <p className="auth-subtitle">{subtitle}</p>
    </div>
  );
} 