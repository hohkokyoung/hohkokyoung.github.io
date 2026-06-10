export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-lichen)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-cream-paper)', flexWrap: 'wrap', gap: '8px' }}>
      <span className="mono" style={{ color: 'var(--color-eucalyptus)' }}>Hoh Kok Young · Singapore</span>
      <span className="mono" style={{ color: 'var(--color-eucalyptus)' }}>{new Date().getFullYear()}</span>
    </footer>
  )
}
