import { useState, useEffect } from 'react';
import './index.css';
import HeroBanner from './components/HeroBanner';
import FocusTimer from './components/FocusTimer';
import MemePanel from './components/MemePanel';
import DiarySection from './components/DiarySection';
import LoginScreen from './components/LoginScreen';
import LiveClock from './components/LiveClock';
import WeatherWidget from './components/WeatherWidget';
import QuoteWidget from './components/QuoteWidget';
import { exportToPdf } from './utils/pdfGenerator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('cloud_journal_token')
  );
  
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  
  const API_URL = 'http://100.53.25.208:3001/api/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Görevler çekilemedi:', error);
      setLoading(false);
    }
  };

  const submitTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTitle('');
    } catch (error) {
      console.error('Görev eklenemedi:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH'
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (error) {
      console.error('Görev güncellenemedi:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Görev silinemedi:', error);
    }
  };

  const handleExportPDF = async () => {
    try {
      const res = await fetch('http://100.53.25.208:3001/api/diary');
      const fetchedDiaries = await res.json();
      exportToPdf(tasks, fetchedDiaries);
    } catch (err) {
      console.error('PDF Export Error:', err);
      alert('PDF oluşturulamadı!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cloud_journal_token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-window">
      <HeroBanner onLogout={handleLogout} />
      
      {/* Step 3: Metrics Section (Weather, Clock, Quote) */}
      <section className="section-full section-light">
        <div className="main-grid" style={{ gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="metric-card">
             <div className="metric-label">🕒 LIVE PERFORMANCE</div>
             <LiveClock />
          </div>
          <div className="metric-card">
             <div className="metric-label">🌤️ ATMOSPHERE</div>
             <WeatherWidget />
          </div>
          <div className="metric-card">
             <div className="metric-label">💡 CREATIVE SPARK</div>
             <QuoteWidget />
          </div>
        </div>
      </section>

      {/* Step 2: Pomodoro Space Section */}
      <section className="section-full section-dark" id="timer-section">
        <div className="stardust"></div>
        <FocusTimer />
      </section>

      {/* Step 4: Content Section (Journal & Tasks) */}
      <section className="section-full section-warm">
        <main className="main-grid">
          <div className="diary-column" id="blog-section">
            <DiarySection />
          </div>

          <aside className="side-panels" id="tasks-section">
            <div className="metric-card" style={{ padding: '2rem' }}>
              <div className="section-header">
                <span className="serif-font" style={{ fontSize: '1.75rem' }}>Daily Tasks</span>
                <button onClick={handleExportPDF} className="btn-vibrant" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>
                  EXPORT
                </button>
              </div>

              <form onSubmit={submitTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  style={{ 
                    flex: 1, 
                    padding: '0.8rem', 
                    borderRadius: '12px', 
                    border: '1px solid var(--border-color)',
                    fontSize: '0.9rem'
                  }}
                  placeholder="New goal..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit" className="btn-vibrant" style={{ padding: '0.8rem 1.2rem' }}>+</button>
              </form>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {tasks.map(task => (
                  <li key={task.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '1rem', 
                    background: task.completed ? '#f8fafc' : '#ffffff',
                    border: '1px solid var(--border-color)',
                    marginBottom: '0.75rem',
                    borderRadius: '12px',
                    transition: 'all 0.2s'
                  }}>
                    <input 
                      type="checkbox" 
                      checked={task.completed} 
                      onChange={() => toggleTask(task.id)}
                      style={{ transform: 'scale(1.2)', marginRight: '1rem', cursor: 'pointer' }}
                    />
                    <span style={{ 
                      flex: 1, 
                      fontSize: '0.95rem', 
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'var(--text-muted)' : 'var(--text-main)',
                      fontWeight: task.completed ? 400 : 500
                    }}>
                      {task.title}
                    </span>
                    <button 
                      style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.2rem' }} 
                      onClick={() => deleteTask(task.id)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <MemePanel />
          </aside>
        </main>
      </section>
    </div>
  );
}

export default App;
