import React from 'react';

export default function WelcomeModal({ show, onDismiss }) {
  if (!show) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(20,24,40,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'var(--color-surface-elevated)', borderRadius: '1.5rem', boxShadow: '0 8px 32px #0004', padding: '2.5rem 2rem', maxWidth: 420, width: '90%', textAlign: 'center', color: 'var(--color-text-primary)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-accent-blue)' }}>Welcome to CSS Framework Playground!</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.2rem' }}>Experiment with Bootstrap, Tailwind, and Bulma components. Edit HTML & CSS, preview live, export, share, and build your own component library!</p>
        <ul style={{ textAlign: 'left', margin: '0 auto 1.2rem auto', maxWidth: 340, color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
          <li>• Choose a framework and insert components from the sidebar</li>
          <li>• Edit HTML and add custom CSS</li>
          <li>• Export, share, or save your work</li>
          <li>• Add your own custom components</li>
        </ul>
        <button onClick={onDismiss} style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #38b6ff 100%)', color: '#fff', border: 'none', borderRadius: '1rem', padding: '0.9rem 2.2rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', marginTop: '0.5rem', boxShadow: '0 2px 8px #4f8cff33' }}>Get Started</button>
      </div>
    </div>
  );
} 