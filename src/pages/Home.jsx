import Hero from '../components/Hero.jsx'
import ServicesGrid from '../components/ServicesGrid.jsx'
import AboutIntro from '../components/AboutIntro.jsx'
import Marquee from '../components/Marquee.jsx'
import ShowcaseSection from '../components/ShowcaseSection.jsx'
import TeamGrid from '../components/TeamGrid.jsx'
import AutoVideo from '../components/AutoVideo.jsx'
import Tools from '../components/Tools.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { asset } from '../utils.js'

export default function Home() {
  usePageMeta('Adventa Tek', 'Adventa Tek is a brand and technology studio: branding, digital marketing, development and 3D modelling under one roof.')
  return (
    <>
      <Hero />
      <main>
        <ServicesGrid />
        <AboutIntro button />
        <Marquee />
        <ShowcaseSection />
        {/* Team section hidden for now — remove the comment markers to show it again
        <section className="light team" id="team">
          <div className="wrap">
            <h2>A team built to think, create, and innovate</h2>
            <TeamGrid />
          </div>
        </section>
        */}
        <section className="skills" aria-label="What we do">
          <AutoVideo lazy src={asset('media/skills.mp4')} />
        </section>
        <Tools />
      </main>
    </>
  )
}
