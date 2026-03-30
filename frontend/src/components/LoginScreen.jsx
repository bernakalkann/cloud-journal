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
        localStorage.setItem('cloud_journal_token', data.token);
        onLoginSuccess();
      } else {
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
      background: '#f0f7ff',
      fontFamily: '"Inter", sans-serif'
    }}>
      <div style={{
        background: '#ffffff',
        padding: '3.5rem 2.5rem',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '420px',
        border: '1px solid #e2e8f0',
        textAlign: 'center'
      }}>
        
        <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/logo.png" 
            alt="Cloud Journal" 
            style={{ width: '160px', borderRadius: '50%', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.1)' }} 
          />
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>Hos Geldiniz</h1>
        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.95rem' }}>Cloud Journal hesabınıza giriş yapın</p>

        {error && (
          <div style={{ background: '#fef2f2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: '600' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem', display: 'block' }}>Kullanıcı Adı</label>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem', display: 'block' }}>Şifre</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background 0.2s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Sistem Hazırlanıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.75rem', color: '#64748b', lineHeight: '1.5' }}>
          💡 <b>Değerlendirme İçin:</b><br/>
          Kullanıcı Adı: <b>admin</b> | Şifre: <b>cloud123</b>
        </div>

      </div>
    </div>
  );
}
