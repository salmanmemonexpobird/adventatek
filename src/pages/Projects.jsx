import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Cta from '../components/Cta.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { PROJECTS } from '../data/content.jsx'

const FILTERS = [['all', 'All'], ['Branding', 'Branding'], ['Digital', 'Digital'], ['Development', 'Development']]

export default function Projects() {
  usePageMeta('Showcase | Adventa Tek', 'Selected branding, digital and development projects by Adventa Tek.')
  const [params] = useSearchParams()
  const initial = FILTERS.some(([k]) => k === params.get('filter')) ? params.get('filter') : 'all'
  const [filter, setFilter] = useState(initial)
  const [gone, setGone] = useState(() => new Set()) // items fully hidden after their fade-out
  const [fading, setFading] = useState(() => new Set()) // items currently fading
  const btnRefs = useRef({})
  const [ind, setInd] = useState({ left: 0, width: 100 })

  // Sliding lime indicator follows the active button
  const place = () => {
    const b = btnRefs.current[filter]
    if (b) setInd({ left: b.parentElement.offsetLeft, width: b.offsetWidth })
  }
  useLayoutEffect(place, [filter])
  useEffect(() => {
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => window.removeEventListener('resize', place)
  }, [filter])

  // Fade out the ones that do not match, then remove them from the layout
  useEffect(() => {
    const out = new Set(), back = new Set()
    PROJECTS.forEach((p, i) => (filter === 'all' || p.cat === filter ? back : out).add(i))
    setFading(out)
    setGone((g) => new Set([...g].filter((i) => !back.has(i))))
    const t = setTimeout(() => setGone(out), 350)
    return () => clearTimeout(t)
  }, [filter])

  return (
    <main>
      <PageHero crumb="Projects" title={<>Showcase<em>.</em></>} lead="A selection of the brands, campaigns and websites we have built. Filter by service to see how each one came together." />
      <section className="light sec">
        <div className="wrap">
          <div className="filter-wrap">
            <div className="filter" role="group" aria-label="Filter projects">
              <span className="nav-active" aria-hidden="true" style={{ left: ind.left, width: ind.width }}></span>
              <ul>
                {FILTERS.map(([k, label]) => (
                  <li key={k}>
                    <button type="button" ref={(el) => (btnRefs.current[k] = el)} className={filter === k ? 'on' : ''} aria-pressed={filter === k} onClick={() => setFilter(k)}>{label}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pf-grid" id="pfGrid">
            {PROJECTS.map((p, i) => (
              <article className={'pf-item' + (fading.has(i) ? ' is-out' : '')} hidden={gone.has(i)} key={p.name}>
                <a className="image" href="#" onClick={(e) => e.preventDefault()} aria-label={p.name}>
                  <div className={'art ' + p.art}><span className="tg">{p.cat.toUpperCase()}</span></div>
                </a>
                <h3><a href="#" onClick={(e) => e.preventDefault()}>{p.name}</a></h3>
                <div className="meta">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </main>
  )
}
