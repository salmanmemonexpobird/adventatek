import PageHero from '../components/PageHero.jsx'
import TeamGrid from '../components/TeamGrid.jsx'
import Values from '../components/Values.jsx'
import Cta from '../components/Cta.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function Team() {
  usePageMeta('Team | Adventa Tek', 'Meet the Adventa Tek team.')
  return (
    <main>
      <PageHero crumb="Team" title={<>The <em>Team.</em></>} lead="Designers, developers and marketers who plan, design and ship together." />
      <section className="light team inner sec">
        <div className="wrap">
          <div className="sec-head"><h2>A team built to plan, design, and ship</h2></div>
          <TeamGrid />
        </div>
      </section>
      <section className="light sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head"><h2>How we treat the work</h2></div>
          <Values />
        </div>
      </section>
      <Cta />
    </main>
  )
}
