// Odaklanma Sayacı (Focus Timer)
import { useState, useEffect } from 'react';

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('ODAKLAN'); // ODAKLAN, KISA MOLA

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
    <div className="timer-panel">
      <div className="timer-icons">
        <svg fill="none" strokeWidth="2" stroke="#6b7280" viewBox="0 0 24 24" width="32" height="32"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l5 3M12 1V3M19 4l-2 2M5 4l2 2"/></svg>
        <svg fill="none" strokeWidth="2" stroke="#6b7280" viewBox="0 0 24 24" width="32" height="32"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/></svg>
      </div>
      <div className="timer-top-label">ABOUT MARK</div>
      <div className="timer-header">ODAKLANMA SAYACI</div>
      <div className="timer-display">{mins}:{secs}</div>
      <div className="timer-btn-group">
        <button className={`timer-btn ${mode === 'ODAKLAN' ? 'active' : ''}`} onClick={() => setTimerMode('ODAKLAN', 25)}>ODAKLAN</button>
        <button className={`timer-btn ${mode === 'KISA MOLA' ? 'active' : ''}`} onClick={() => setTimerMode('KISA MOLA', 5)}>KISA MOLA</button>
        <button className="timer-btn" onClick={toggleTimer}>{isRunning ? 'DURDUR' : 'BAŞLAT'}</button>
        <button className="timer-btn" onClick={() => setTimerMode(mode, mode === 'ODAKLAN' ? 25 : 5)}>SIFIRLA</button>
      </div>
    </div>
  );
}
