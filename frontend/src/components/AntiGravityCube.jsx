import React from 'react';

export default function AntiGravityCube() {
  return (
    <div style={{ width: '48px', height: '48px', position: 'relative' }}>
      <svg viewBox="0 0 100 100" fill="none" style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 204, 0.8))' }}>
        <path d="M50 15 L85 35 L85 75 L50 95 L15 75 L15 35 Z" stroke="#00ffcc" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M50 15 L50 55 L85 75 M50 55 L15 75" stroke="#00ffcc" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M15 35 L50 55 L85 35" stroke="#00ffcc" strokeWidth="3" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
