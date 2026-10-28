import Hero from '../components/Hero.jsx'
import ServicesGrid from '../components/ServicesGrid.jsx'
import AboutIntro from '../components/AboutIntro.jsx'
import Marquee from '../components/Marquee.jsx'
import ShowcaseSection from '../components/ShowcaseSection.jsx'
import TeamGrid from '../components/TeamGrid.jsx'
import Culture from '../components/Culture.jsx'
import AutoVideo from '../components/AutoVideo.jsx'
import Tools from '../components/Tools.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { asset } from '../utils.js'

export default function Home() {
  usePageMeta('Adventa Tek', 'Adventa Tek is a brand and technology studio: branding, digital marketing and development under one roof.')
  return (
    <>
      <Hero />
      <main>
        <ServicesGrid />
        <AboutIntro button />
        <Marquee />
        <ShowcaseSection />
        <section className="light team" id="team">
          <div className="wrap">
            <h2>A team built to plan, design, and ship</h2>
            <TeamGrid />
          </div>
        </section>
        <Culture />
        <section className="skills" aria-label="What we do">
          <AutoVideo lazy src={asset('media/skills.mp4')} />
        </section>
        <Tools />
      </main>
    </>
  )
}
