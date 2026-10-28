import Newsletter from './Newsletter.jsx'

const Mark = () => (
  <svg className="mark" viewBox="0 0 1235 1046" aria-hidden="true">
    <path fill="#050608" d="M616 0L1235 1046H1028L617 336 206 1046H0Z" />
    <path fill="#fff" d="M614 579L884 1046H352Z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <Newsletter />
        <div className="dash"></div>
        <div className="foot-grid">
          <div>
            <h3>Information</h3>
            <p>Adventa Tek helps businesses look sharper, sell more and run smoother online, with branding, digital marketing and development <b style={{ color: 'var(--paper)' }}>under one roof</b>.</p>
          </div>
          <div>
            <h3>Get in Touch</h3>
            <ul>
              <li>Karachi, Sindh, Pakistan</li>
              <li className="copyable">+92 300 0000000</li>
              <li className="copyable">hello@adventatek.com</li>
            </ul>
          </div>
          <div className="vbadge" aria-hidden="true">
            <div className="v">ADVENTA <small>TEK · PK · US</small></div>
            <div className="sq"><Mark /></div>
          </div>
        </div>
        <div className="dash"></div>
        <div className="foot-bottom">
          <p>© {new Date().getFullYear()} Adventa Tek.</p>
          <div className="socials">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3z" /></svg></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24"><path d="M6.9 8.9H3.6V20h3.3V8.9zM5.2 3.5a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zM20.4 13.6c0-3-1.6-4.9-4.2-4.9-1.5 0-2.4.8-2.8 1.5V8.9h-3.2V20h3.3v-5.6c0-1.5.3-2.8 2-2.8s1.7 1.6 1.7 2.9V20h3.2v-6.4z" /></svg></a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24"><path d="M12 7.3a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4zm0 7.7a3 3 0 110-6 3 3 0 010 6zm4.9-8.9a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2zM21 7.8c-.1-1.5-.4-2.8-1.5-3.8s-2.3-1.4-3.8-1.5C14.2 2.4 9.8 2.4 8.3 2.5c-1.5.1-2.8.4-3.8 1.5S3.1 6.3 3 7.8c-.1 1.5-.1 6 0 7.5.1 1.5.4 2.8 1.5 3.8s2.3 1.4 3.8 1.5c1.5.1 5.9.1 7.4 0 1.5-.1 2.8-.4 3.8-1.5s1.4-2.3 1.5-3.8c.1-1.5.1-6 0-7.5z" /></svg></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
