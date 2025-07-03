import React from 'react';

const SunIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
);

export default function Header({ theme, handleToggleTheme, onReset, children }) {
  return (
    <header className="app-header">
      <h1 className="header-title">CSS Framework Playground</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={onReset}
          style={{
            background: 'none',
            border: '1.5px solid var(--color-accent-blue-light)',
            color: 'var(--color-accent-blue-light)',
            borderRadius: '0.7rem',
            padding: '0.4rem 1.1rem',
            fontWeight: 600,
            fontSize: '1rem',
            marginRight: '0.7rem',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
          title="Reset Playground"
        >
          Reset
        </button>
        {children}
        <button
          onClick={handleToggleTheme}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-accent-blue-light)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            marginLeft: '1rem',
            transition: 'color 0.2s',
            display: 'flex',
            alignItems: 'center',
          }}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? SunIcon : MoonIcon}
        </button>
      </div>
    </header>
  );
} 