import { useState, useEffect } from 'react';

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState([]);

  const cities = [
    { name: 'İstanbul', lat: 41.0138, lon: 28.9497 },
    { name: 'Ankara', lat: 39.9199, lon: 32.8543 },
    { name: 'Gaziantep', lat: 37.0662, lon: 37.3833 }
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const promises = cities.map(city => 
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code&timezone=Europe%2FIstanbul`)
            .then(res => res.json())
            .then(data => ({
              name: city.name,
              temp: data.current.temperature_2m,
              code: data.current.weather_code
            }))
        );
        const results = await Promise.all(promises);
        setWeatherData(results);
      } catch (err) {
        console.error("Hava durumu çekilirken hata", err);
      }
    };
    
    fetchWeather();
  }, []);

  const getWeatherIcon = (code) => {
    if (code === undefined) return <svg className="weather-icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
    if (code <= 3) return <svg className="weather-icon-svg" viewBox="0 0 24 24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>;
    if (code <= 67) return <svg className="weather-icon-svg" viewBox="0 0 24 24"><path d="M16 13v8"/><path d="M8 13v8"/><path d="M12 15v8"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>;
    return <svg className="weather-icon-svg" viewBox="0 0 24 24"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>;
  };

  return (
    <div className="journal-panel weather-widget" style={{ flex: '1.5' }}>
      <h3 style={{marginTop: 0, marginBottom: '0.8rem', fontSize: '1.1rem'}}>Bugün Hava Nasıl?</h3>
      {weatherData.length > 0 ? (
        <div className="weather-list">
          {weatherData.map((data, index) => (
            <div key={index} className="weather-row">
              <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>{data.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                {getWeatherIcon(data.code)}
                <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>{data.temp}°C</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{color: 'var(--sage-green)'}}>Veriler çekiliyor...</p>
      )}
    </div>
  );
}
