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
      title: 'Jon Hopkins',
      content: "Geçtiğimiz gün e-posta kutuma düşen Jon Hopkins referanslı bir iletişim tasarımı örneği üzerine düşünüyordum. Kullanıcı deneyimi, sanatsal detayların bulut mimarisine pürüzsüz entegrasyonuyla şekillendiğinde sistem hem ölçeklenebilir hem de estetik açıdan doyurucu bir hal alıyor. Bu harika referansı kesinlikle projeye entegre edeceğim.",
      date: '2009-08-20T10:00:00Z',
      pic: '👦🏻'
    },
    {
      id: 'pre-1',
      title: 'Dijital Ajanda',
      content: "Dijital Ajanda platformumuzu baştan aşağı yeniledik. İlk prototipleri hazırlarken eski moda yapılar yerine, React ve esnek Node.js backend kullanarak tamamen ölçeklenebilir bir bulut altyapısı inşa etmeye karar verdik. Mimari geçişler sorunsuz bir şekilde ilerliyor.",
      date: '2009-10-11T12:00:00Z',
      pic: '📸'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div className="dark-blog-card">
        <h2>✏️ Günlük / Blog Ekle</h2>
        <form onSubmit={addDiary}>
          <textarea 
            className="paper-input"
            style={{ backgroundColor: '#fffdf8', color: '#111' }}
            placeholder="Bugün nasıl hissediyorsun? Düşüncelerini buraya yaz... 💡" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
          />
          <button type="submit" className="blog-btn" style={{ marginTop: '1rem' }}>Yayınla (POST)</button>
        </form>
      </div>

      {diaries.slice().reverse().map((d, index) => (
        <div key={d.id} className="dark-blog-card">
          <h2>Kayıt #{diaries.length - index} <span>{new Date(d.date).toLocaleDateString('tr-TR')}</span></h2>
          <div className="blog-content">
             <div className="blog-image-placeholder">
                {['📸', '🖼️', '🚀', '💻'][index % 4]}
             </div>
             <div className="blog-text">
                {d.content}
                <br/><br/>
                <em style={{color: '#9ca3af', fontSize: '0.8rem'}}>Posted on {new Date(d.date).toLocaleString('tr-TR')} in PERSONAL RAMBLINGS [{d.id}]</em>
             </div>
          </div>
        </div>
      ))}

      {dummyEntries.map((d, index) => (
         <div key={d.id} className="dark-blog-card">
           <h2>{d.title}</h2>
           <div className="blog-content">
              <div className="blog-image-placeholder">{d.pic}</div>
              <div className="blog-text">
                 {d.content}
                 <br/><br/>
                 <em style={{color: '#9ca3af', fontSize: '0.8rem'}}>Posted on {new Date(d.date).toLocaleString('tr-TR')} in PERSONAL RAMBLINGS</em>
              </div>
           </div>
         </div>
      ))}

    </div>
  );
}
