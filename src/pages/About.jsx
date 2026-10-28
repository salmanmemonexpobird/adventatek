import PageHero from '../components/PageHero.jsx'
import AboutIntro from '../components/AboutIntro.jsx'
import Marquee from '../components/Marquee.jsx'
import Culture from '../components/Culture.jsx'
import Values from '../components/Values.jsx'
import Cta from '../components/Cta.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { STEPS } from '../data/content.jsx'

export default function About() {
  usePageMeta('About Us | Adventa Tek', 'About Adventa Tek, a brand and technology studio in Karachi.')
  return (
    <main>
      <PageHero crumb="About Us" title={<>About <em>Us.</em></>} lead="A brand and technology studio in Karachi, working with businesses in Pakistan and the US. Branding, digital marketing and development, all under one roof." />
      <AboutIntro />
      <section className="light sec" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="sec-head"><h2>How we work</h2><p>Four steps, the same every time. You always know where your project is and what happens next.</p></div>
          <div className="steps">
            {STEPS.map((s) => (
              <article className="step" key={s.n}><span className="n">{s.n}</span><div><h3>{s.t}</h3><p>{s.d}</p></div></article>
            ))}
          </div>
        </div>
      </section>
      <Marquee />
      <section className="light sec">
        <div className="wrap">
          <div className="sec-head"><h2>What we stand for</h2></div>
          <Values />
        </div>
      </section>
      <Culture />
      <Cta />
    </main>
  )
}
