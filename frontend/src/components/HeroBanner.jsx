import QuoteWidget from './QuoteWidget';
import LiveClock from './LiveClock';
import WeatherWidget from './WeatherWidget';

export default function HeroBanner({ onLogout }) {
  const handleScroll = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'settings') {
      alert("⚙️ Ayarlar (Settings) paneli bakımda! Daha sonra eklenecek.");
    } else {
      const el = document.getElementById(id);
      if (el) {
        // Scroll with a little offset so it sits nicely
        const y = el.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const linkStyle = { cursor: 'pointer' };

  return (
    <>
      <div className="hero-banner" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', alignItems: 'stretch' }}>
        
        {/* Column 1: Logo */}
        <div style={{ flex: '1 1 300px', maxWidth: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src="/logo.png" 
            alt="Cloud Journal" 
            style={{ 
              width: '100%', 
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))'
           }} 
          />
        </div>

        {/* Column 2: Dashboard Info */}
        <div style={{ flex: '1 1 300px', maxWidth: '350px', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '2rem 1.5rem',
            borderRadius: '8px',
            border: '2px dashed #d1d5db',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1rem',
            height: '100%',
            textAlign: 'center',
            fontFamily: '"Courier Prime", monospace'
          }}>
            <div style={{fontWeight: 'bold', fontSize: '0.9rem', color: '#6b7280', letterSpacing: '1px'}}>📍 DASHBOARD INFO</div>
            <LiveClock />
            <hr style={{width: '100%', border: '0', borderTop: '1px dashed #e5e7eb'}} />
            <WeatherWidget />
          </div>
        </div>

        {/* Column 3: Quote */}
        <div style={{ flex: '1 1 300px', maxWidth: '350px', display: 'flex', flexDirection: 'column' }}>
          <QuoteWidget />
        </div>

      </div>
      
      <div className="local-nav-bar">
        <span style={linkStyle} onClick={() => handleScroll('top')} title="Başa Dön">Cloud Journal</span> | 
        <span style={linkStyle} onClick={() => handleScroll('top')}>Saat</span> | 
        <span style={linkStyle} onClick={() => handleScroll('top')}>Hava Durumu</span> | 
        <span style={linkStyle} onClick={() => handleScroll('tasks-section')}>Görevler</span> | 
        <span style={linkStyle} onClick={() => handleScroll('blog-section')}>Blog</span> | 
        <span style={linkStyle} onClick={() => handleScroll('settings')}>Ayarlar</span> | 
        <span style={{ color: '#ef4444', fontWeight: 'bold', cursor: 'pointer' }} onClick={onLogout} title="Oturumu Kapat">Çıkış Yap</span>
      </div>
    </>
  );
}
