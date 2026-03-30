import { useState, useEffect } from 'react';
import './index.css';
import HeroBanner from './components/HeroBanner';
import FocusTimer from './components/FocusTimer';
import MemePanel from './components/MemePanel';
import DiarySection from './components/DiarySection';
import LoginScreen from './components/LoginScreen';
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
      alert('PDF oluşturulamadı! Lütfen sunucunun açık olduğundan emin olun.');
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
      
      <div className="content-wrapper">
        <div className="column-left" id="blog-section">
          <DiarySection />
        </div>

        <div className="column-right">

          <div className="paper-block" id="tasks-section">
            <div className="paper-block-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 1rem 0', borderBottom: '1px dashed #d1d5db', paddingBottom: '0.5rem' }}>
              <span style={{ borderBottom: 'none', margin: 0, padding: 0 }}>DAILY TASKS</span>
              <button onClick={handleExportPDF} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.3rem 0.6rem', cursor: 'pointer', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                📄 EXPORT PDF
              </button>
            </div>
            <form onSubmit={submitTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input 
                type="text" 
                className="paper-input" 
                style={{marginTop: 0, padding: '0.5rem'}}
                placeholder="Yenisini ekle..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button type="submit" className="blog-btn" style={{marginTop: 0, padding: '0.5rem 1rem'}}>+</button>
            </form>

            {loading ? (
              <p>Yükleniyor...</p>
            ) : (
              <ul className="clean-list">
                {tasks.map(task => (
                  <li key={task.id} className={task.completed ? 'completed' : ''}>
                    <div className="task-content" onClick={() => toggleTask(task.id)}>
                      <div className={`checkbox-box ${task.completed ? 'checked' : ''}`}>
                        {task.completed ? '✓' : ''}
                      </div>
                      <span className="task-text" style={{fontSize: '0.9rem'}}>{task.title}</span>
                    </div>
                    <button className="delete-sm" onClick={() => deleteTask(task.id)}>×</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="floating-panels">
             <FocusTimer />
             <MemePanel />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
