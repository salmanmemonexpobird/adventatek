import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import ServicesGrid from '../components/ServicesGrid.jsx'
import Tools from '../components/Tools.jsx'
import Cta from '../components/Cta.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { SERVICES } from '../data/content.jsx'

export default function Services() {
  usePageMeta('Services | Adventa Tek', 'Branding, digital marketing and development services from Adventa Tek.')
  return (
    <main>
      <PageHero crumb="Services" title={<>Our <em>Services.</em></>} lead="Three things, done properly: build the brand, grow the audience, ship the product." />
      <ServicesGrid />
      <section className="light sec" style={{ paddingTop: 30 }}>
        <div className="wrap">
          <div className="sec-head"><h2>What we do, in detail</h2><p>Pick one service or all three. They are designed to work together.</p></div>
          {SERVICES.map((s) => (
            <article className="srv-row" key={s.key}>
              <div><span className="no">{s.no}</span><h3>{s.title}</h3></div>
              <div>
                <p>{s.short}</p>
                <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <Link className="go" to={`/projects?filter=${s.key}`}>See {s.title.toLowerCase()} work <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Tools />
      <Cta />
    </main>
  )
}
