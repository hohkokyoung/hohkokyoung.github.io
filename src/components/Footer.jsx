export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__logo">ky<span style={{ color: 'var(--blue-500)' }}>.</span></span>
        <span className="footer__copy">© {new Date().getFullYear()} Hoh Kok Young. Built with React & ❤️</span>
        <a href="#home" className="footer__top">↑ Back to top</a>
      </div>
    </footer>
  )
}
