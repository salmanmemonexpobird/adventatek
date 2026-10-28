import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SHOWCASE } from '../data/content.jsx'

export default function ShowcaseSection() {
  const [i, setI] = useState(0)
  const cls = (n) => 'sc-panel p' + (n + 1) + (i === n ? ' on' : '')
  return (
    <section className="light showcase" id="work">
      <div className="wrap sc-grid">
        <div>
          <p className="eyebrow">Featured projects</p>
          <h2>Studio Showcase</h2>
          <ul className="sc-list" id="scList">
            {SHOWCASE.map((p, n) => (
              <li key={p.name}>
                <button className={i === n ? 'active' : ''} onMouseEnter={() => setI(n)} onFocus={() => setI(n)} onClick={() => setI(n)}>
                  <span>{p.name}</span><span className="cat">{p.cat}</span>
                </button>
              </li>
            ))}
          </ul>
          <Link to="/projects" className="btn"><span className="dot">+</span>All Projects</Link>
        </div>
        <div className="sc-stage" id="scStage">
          <div className={cls(0)}><div className="shape"></div><span className="tag">BRAND IDENTITY</span><span className="name">Project<br />One</span></div>
          <div className={cls(1)}><div className="grid"></div><div className="card"></div><span className="tag">MOBILE COMMERCE</span><span className="name" style={{ position: 'relative' }}>Project<br />Two</span></div>
          <div className={cls(2)}><div className="win"></div><span className="tag">WEB PLATFORM</span><span className="name">Project<br />Three</span></div>
          <div className={cls(3)}><div className="phone"></div><span className="tag" style={{ background: 'var(--lime)', color: 'var(--ink)' }}>APP DESIGN</span><span className="name">Project<br />Four</span></div>
        </div>
      </div>
    </section>
  )
}
