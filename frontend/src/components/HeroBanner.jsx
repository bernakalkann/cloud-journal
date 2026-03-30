import { useState } from 'react';

export default function HeroBanner({ onLogout }) {
  const handleScroll = (id) => {
    if (id === 'settings') {
      alert("⚙️ Ayarlar paneli yakında!");
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="header-section">
        <nav className="nav-links">
          <span className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>HOME</span>
          <span className="nav-link" onClick={() => handleScroll('blog-section')}>JOURNAL</span>
          <span className="nav-link" onClick={() => handleScroll('tasks-section')}>TASKS</span>
          <span className="nav-link" onClick={() => handleScroll('timer-section')}>FOCUS</span>
          <span className="nav-link" onClick={() => handleScroll('settings')}>SETTINGS</span>
          <span className="nav-link" style={{ color: '#ef4444' }} onClick={onLogout}>LOGOUT</span>
        </nav>
      </header>

      <section className="section-full section-warm">
        <div className="hero-branding">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src="/logo.png" alt="Cloud Journal" className="logo-image" style={{ marginBottom: '1.5rem' }} />
          </div>
          <h1 className="serif-font" style={{ fontWeight: 800, letterSpacing: '-1px' }}>Cloud <span>Journal</span></h1>
          <p style={{ 
            marginTop: '0.5rem', 
            fontSize: '1.2rem', 
            color: 'var(--text-muted)', 
            letterSpacing: '3px',
            fontWeight: 600,
            opacity: 0.8
          }}>DIGITAL SPACE FOR THE MODERN ARCHITECT</p>
        </div>
      </section>
    </>
  );
}
