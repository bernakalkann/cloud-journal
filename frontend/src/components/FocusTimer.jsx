// Odaklanma Sayacı (Focus Timer) - Space Edition
import { useState, useEffect } from 'react';

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('ODAKLAN'); // ODAKLAN, KISA MOLA, UZUN MOLA

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const setTimerMode = (newMode, minutes) => {
    setMode(newMode);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="space-timer-container">
      <div className="timer-big-display">{mins}:{secs}</div>

      <button className="timer-main-btn" onClick={toggleTimer}>
        {isRunning ? 'Durdur' : 'Başlat'}
      </button>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '3rem' }}>
        <button 
          className={`timer-mode-btn ${mode === 'ODAKLAN' ? 'active' : ''}`} 
          onClick={() => setTimerMode('ODAKLAN', 25)}
        >
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Odaklan</span>
          <span style={{ fontWeight: 700 }}>25 dk</span>
          <span style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>🎯</span>
        </button>

        <button 
          className={`timer-mode-btn ${mode === 'KISA MOLA' ? 'active' : ''}`} 
          onClick={() => setTimerMode('KISA MOLA', 5)}
        >
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Kısa ara ver</span>
          <span style={{ fontWeight: 700 }}>5 dk</span>
          <span style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>☕</span>
        </button>

        <button 
          className={`timer-mode-btn ${mode === 'UZUN MOLA' ? 'active' : ''}`} 
          onClick={() => setTimerMode('UZUN MOLA', 30)}
        >
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Uzun ara ver</span>
          <span style={{ fontWeight: 700 }}>30 dk</span>
          <span style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>⌛</span>
        </button>
      </div>

      <button className="timer-main-btn" style={{ background: 'rgba(139, 92, 246, 0.5)', marginTop: '3rem', fontSize: '1rem', padding: '0.8rem 2rem' }}>
        📊 İstatistiklerim
      </button>
    </div>
  );
}
