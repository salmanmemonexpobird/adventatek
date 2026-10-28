import { Link } from 'react-router-dom'

export default function AboutIntro({ button = false }) {
  return (
    <section className="light about" id="about">
      <div className="wrap about-grid">
        <div>
          <p className="eyebrow">Welcome to Adventa Tek</p>
          <h2>A studio where great brands and solid code are built in the same room</h2>
          <div className="about-cols">
            <div>
              <h3>OUR MISSION</h3>
              <p>Brands that look sharp, sites that load fast, campaigns that bring in customers. We take scattered ideas and turn them into something your audience understands in a second.</p>
            </div>
            <div>
              <h3>OUR GOAL</h3>
              <p>Every brand we touch should get noticed, get chosen and get remembered. That means design and engineering working together from day one, not handed off at the end.</p>
            </div>
          </div>
          {button && <Link to="/about" className="btn"><span className="dot">+</span>More About Us</Link>}
        </div>
        <div className="badge" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="98" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="64" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
            <defs><path id="circ" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
            <g className="ring"><text><textPath href="#circ">8+ YEARS OF BUILDING • BRAND • CODE •</textPath></text></g>
          </svg>
          <div className="core">8+</div>
        </div>
      </div>
    </section>
  )
}
