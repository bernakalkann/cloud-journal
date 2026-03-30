import { useState, useEffect } from 'react';

export default function DiarySection() {
  const [diaries, setDiaries] = useState([]);
  const [content, setContent] = useState('');
  
  const API_URL = 'http://100.53.25.208:3001/api/diary';

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDiaries(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addDiary = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      const newD = await res.json();
      setDiaries([...diaries, newD]);
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  const dummyEntries = [
    {
      id: 'pre-2',
      title: 'Digital Experience',
      content: "Exploring the intersection of art and cloud architecture. Integrating Jon Hopkins' aesthetic into communication design creates a seamless, scalable, and visually satisfying experience. This reference is key for our upcoming project phase.",
      date: '2024-03-20T10:00:00Z',
      pic: '👦🏻'
    },
    {
      id: 'pre-1',
      title: 'Structural Shift',
      content: "Rebuilding the Digital Journal platform. Moving from legacy structures to a robust React/Node.js stack on AWS. The transition is smooth, ensuring high availability and professional-grade performance.",
      date: '2024-03-11T12:00:00Z',
      pic: '📸'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      <div className="checkered-card" style={{ padding: '2.5rem' }}>
        <h2 className="serif-font" style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>Write Today's Story</h2>
        <form onSubmit={addDiary}>
          <textarea 
            style={{ 
              width: '100%', 
              padding: '1.25rem', 
              borderRadius: '16px', 
              border: '1px solid var(--border-color)',
              fontFamily: 'inherit',
              fontSize: '1rem',
              resize: 'vertical',
              background: '#f8fafc'
            }}
            placeholder="What's on your mind? Capture the spark... 💡" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
          />
          <button type="submit" className="btn-vibrant" style={{ marginTop: '1.5rem' }}>PUBLISH ENTRY</button>
        </form>
      </div>

      {diaries.slice().reverse().map((d, index) => (
        <div key={d.id} className="checkered-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--mango-orange)', letterSpacing: '2px' }}>
              ENTRY #{diaries.length - index}
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              {new Date(d.date).toLocaleDateString('tr-TR')}
            </span>
          </div>
          <p style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', lineHeight: '1.7' }}>{d.content}</p>
        </div>
      ))}

      {dummyEntries.map((d, index) => (
         <div key={d.id} className="checkered-card" style={{ padding: '2rem' }}>
           <h3 className="serif-font" style={{ fontSize: '1.8rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>{d.title}</h3>
           <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--mango-orange)', letterSpacing: '2px', marginBottom: '1rem' }}>
             ARCHIVE REFERENCE
           </div>
           <p style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.7' }}>{d.content}</p>
           <div style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
             Posted on {new Date(d.date).toLocaleString('tr-TR')} in CREATIVE_SPACE
           </div>
         </div>
      ))}

    </div>
  );
}
