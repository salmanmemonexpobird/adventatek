import { useState } from 'react'
import { SERVICES } from '../data/content.jsx'

// The lime circle follows whichever card you hover or tap, and clears when the mouse leaves
export default function ServicesGrid() {
  const [active, setActive] = useState(-1)
  return (
    <section className="light services" id="services">
      <div className="wrap">
        <div className="svc-grid" id="svcGrid" onMouseLeave={() => setActive(-1)}>
          {SERVICES.map((s, i) => (
            <article key={s.key} className={'svc' + (active === i ? ' active' : '')} onMouseEnter={() => setActive(i)} onClick={() => setActive(active === i ? -1 : i)}>
              <span className="bubble" aria-hidden="true"><i></i><i></i><i></i></span>
              <svg viewBox="0 0 64 64" aria-hidden="true">{s.icon}</svg>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
