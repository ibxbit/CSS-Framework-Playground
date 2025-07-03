import React from 'react';

const ClipboardIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Sidebar({
  frameworks,
  selectedFramework,
  setSelectedFramework,
  search,
  setSearch,
  filteredCategories,
  openCategories,
  toggleCategory,
  handleInsertComponent,
  handleCopy,
  copied,
  showAddCustom,
  setShowAddCustom,
  newCustomName,
  setNewCustomName,
  newCustomCode,
  setNewCustomCode,
  handleAddCustom,
  handleDeleteCustom,
  sidebarFooterContent
}) {
  return (
    <aside className="sidebar">
      <div>
        <h2>Framework</h2>
        <select
          value={selectedFramework.name}
          onChange={e => {
            const fw = frameworks.find(f => f.name === e.target.value)
            setSelectedFramework(fw)
          }}
        >
          {frameworks.map(fw => (
            <option key={fw.name} value={fw.name}>{fw.name}</option>
          ))}
        </select>
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: 'var(--color-accent-blue)', marginBottom: '0.5rem' }}>Component Library</h2>
          <input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              marginBottom: '1rem',
              fontSize: '1rem',
              background: 'var(--color-bg-primary)',
              color: 'var(--color-text-primary)',
            }}
          />
          <button onClick={() => setShowAddCustom(v => !v)} style={{ width: '100%', marginBottom: '1rem', background: 'var(--color-accent-blue)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '0.6rem 0', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>+ Add Custom Component</button>
          {showAddCustom && (
            <div style={{ marginBottom: '1rem', background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <input type="text" placeholder="Component Name" value={newCustomName} onChange={e => setNewCustomName(e.target.value)} style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '1rem' }} />
              <textarea placeholder="Component HTML" value={newCustomCode} onChange={e => setNewCustomCode(e.target.value)} style={{ width: '100%', minHeight: '60px', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontFamily: 'Fira Mono, Consolas, monospace', fontSize: '0.95rem' }} />
              <button onClick={handleAddCustom} style={{ background: 'var(--color-accent-blue)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginRight: '0.5rem' }}>Add</button>
              <button onClick={() => setShowAddCustom(false)} style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)', border: 'none', borderRadius: 'var(--radius-md)', padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>
            </div>
          )}
          {filteredCategories.map(([category, comps]) => (
            <div key={category} style={{ marginBottom: '1.2rem' }}>
              <div
                style={{
                  fontWeight: 600,
                  color: 'var(--color-accent-blue)',
                  marginBottom: '0.3rem',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  userSelect: 'none',
                }}
                onClick={() => toggleCategory(category)}
              >
                <span style={{
                  marginRight: '0.5rem',
                  fontSize: '1.1em',
                  color: 'var(--color-accent-blue)',
                  display: 'inline-block',
                  transition: 'transform 0.2s',
                  transform: openCategories[category] ? 'rotate(90deg)' : 'rotate(0deg)',
                }}>▶</span>
                {category}
              </div>
              {openCategories[category] && (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {comps.map((comp) => (
                    <li key={comp.name} style={{ marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        style={{
                          width: '100%',
                          background: 'var(--color-surface-elevated)',
                          color: 'var(--color-text-primary)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-md)',
                          padding: '0.5rem 0.7rem',
                          fontWeight: 500,
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'background 0.2s, color 0.2s',
                          textAlign: 'left',
                          marginBottom: '0.2rem',
                        }}
                        onClick={() => handleInsertComponent(comp.code)}
                      >
                        + {comp.name}
                      </button>
                      <button
                        title="Copy code"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-accent-blue-light)',
                          cursor: 'pointer',
                          fontSize: '1.2em',
                          marginLeft: '0.2rem',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onClick={() => handleCopy(category, comp.name, comp.code)}
                        aria-label="Copy code"
                      >
                        {copied[`${category}-${comp.name}`] ? CheckIcon : ClipboardIcon}
                      </button>
                      {category === 'Custom' && (
                        <button title="Delete" onClick={() => handleDeleteCustom(comp.name)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '1.2em', marginLeft: '0.2rem', padding: 0 }}>🗑️</button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-footer">
        {sidebarFooterContent || <p>Modern UI Playground</p>}
      </div>
    </aside>
  );
} 