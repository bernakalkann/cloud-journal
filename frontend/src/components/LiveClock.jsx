import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="journal-panel clock-widget">
      <div className="clock-time">{time.toLocaleTimeString('tr-TR', timeOptions)}</div>
      <div className="clock-date">{time.toLocaleDateString('tr-TR', dateOptions)}</div>
    </div>
  );
}
