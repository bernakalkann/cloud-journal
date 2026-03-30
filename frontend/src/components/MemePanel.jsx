export default function MemePanel() {
  return (
    <div className="comic-burst">
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 900,
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: '#000',
        marginBottom: '1rem'
      }}>
        GÜNÜN KOMİK PAYLAŞIMI
      </div>
      
      <div className="comic-bubble">
        DOKTORA GİTTİM, AĞRI NEREDE? DEDİ. <br/>
        DOĞU ANADOLU'DA DEDİM. <br/>
        YEMİNİNİ BOZDU, ZOR KAÇTIM.
      </div>

      <div style={{ fontSize: '3.5rem', marginTop: '1rem', filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.2))' }}>
        💥 😂 💥
      </div>
      
      <div style={{
        marginTop: '1.5rem',
        fontSize: '0.8rem',
        fontWeight: 700,
        color: '#000'
      }}>
        Her gün farklı bir çizim komikliği!
      </div>
    </div>
  );
}
