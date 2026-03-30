import { useState, useEffect } from 'react';

export default function QuoteWidget() {
  const [quote, setQuote] = useState({ text: "Yükleniyor...", author: "" });

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => setQuote({ text: data.content, author: data.author }))
      .catch(() => setQuote({ text: "Geleceği tahmin etmenin en iyi yolu, onu icat etmektir.", author: "Alan Kay" }));
  }, []);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '2rem 1.5rem',
      borderRadius: '8px',
      border: '2px dashed #d1d5db',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      fontFamily: '"Courier Prime", monospace',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      boxSizing: 'border-box'
    }}>
      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>💭 QUOTE OF THE DAY</div>
      <blockquote style={{ margin: '0 0 1.5rem 0', fontStyle: 'italic', color: '#111827', fontSize: '1.05rem', lineHeight: '1.5' }}>"{quote.text}"</blockquote>
      <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', padding: '0.5rem 1rem', background: '#f3f4f6', borderRadius: '4px' }}>— {quote.author}</div>
    </div>
  );
}
