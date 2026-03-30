import { useState, useEffect } from 'react';

export default function QuoteWidget() {
  const [quote, setQuote] = useState({ text: "Loading...", author: "" });

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => setQuote({ text: data.content, author: data.author }))
      .catch(() => setQuote({ text: "The best way to predict the future is to invent it.", author: "Alan Kay" }));
  }, []);

  return (
    <div style={{ padding: '0.5rem' }}>
      <blockquote className="serif-font" style={{ 
        fontSize: '1.4rem', 
        fontStyle: 'italic', 
        lineHeight: '1.4', 
        margin: '0 0 1rem 0',
        color: 'var(--text-main)',
        border: 'none'
      }}>
        "{quote.text}"
      </blockquote>
      <div style={{ 
        fontSize: '0.8rem', 
        fontWeight: 800, 
        color: 'var(--mango-orange)', 
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>— {quote.author}</div>
    </div>
  );
}
