export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>hky · {new Date().getFullYear()}</span>
        <span>Singapore</span>
        <a href="#home" className="footer__top">Back to top ↑</a>
      </div>
    </footer>
  )
}
