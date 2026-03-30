import { useState } from 'react';

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://100.53.25.208:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
        // Doğrulama başarılı
        localStorage.setItem('cloud_journal_token', data.token);
        onLoginSuccess();
      } else {
        // Doğrulama başarısız
        setError(data.message || 'Hatalı kullanıcı adı veya şifre!');
      }
    } catch (err) {
      setError('Bağlantı hatası! Backend sunucusunun çalıştığından emin olun.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#d1d5db',
      fontFamily: '"Inter", sans-serif'
    }}>
      <div style={{
        background: '#fffdf8', // Yıpranmış kağıt teması
        padding: '3rem 2.5rem',
        borderRadius: '8px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #e5e5e5',
        textAlign: 'center'
      }}>
        
        {/* Logo Sunumu */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/logo.png" 
            alt="Cloud Journal" 
            style={{ width: '180px', filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))', borderRadius: '50%' }} 
          />
        </div>

        <h2 style={{ fontFamily: '"Courier Prime", monospace', letterSpacing: '2px', color: '#111827', marginBottom: '1.5rem' }}>LOG IN</h2>

        {error && (
          <div style={{ background: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
            🚨 {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: '0.8rem',
              borderRadius: '4px',
              border: '1px dashed #d1d5db',
              background: 'rgba(255,255,255,0.7)',
              fontSize: '0.95rem'
            }}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '0.8rem',
              borderRadius: '4px',
              border: '1px dashed #d1d5db',
              background: 'rgba(255,255,255,0.7)',
              fontSize: '0.95rem'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#111827',
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '4px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background 0.2s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'GİRİŞ YAPILIYOR...' : 'GİRİŞ YAP (LOGIN)'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
          *Okul projesi değerlendirmesi için Kullanıcı Adı: <b>admin</b>, Şifre: <b>cloud123</b>
        </p>

      </div>
    </div>
  );
}
