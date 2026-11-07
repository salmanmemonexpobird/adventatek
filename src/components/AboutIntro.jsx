import { Link } from 'react-router-dom'

export default function AboutIntro({ button = false }) {
  return (
    <section className="light about" id="about">
      <div className="wrap about-grid">
        <div>
          <p className="eyebrow">Welcome to Adventa Tek</p>
          <h2>A studio where great brands and solid code are built in the same room</h2>
        </div>
        <div className="about-cols">
          <article className="about-box">
            <span className="no">01</span>
            <h3>OUR MISSION</h3>
            <p>Brands that look sharp, sites that load fast, campaigns that bring in customers. We take scattered ideas and turn them into something your audience understands in a second.</p>
          </article>
          <article className="about-box">
            <span className="no">02</span>
            <h3>OUR GOAL</h3>
            <p>Every brand we touch should get noticed, get chosen and get remembered. That means design and engineering working together from day one, not handed off at the end.</p>
          </article>
        </div>
        {button && (
          <div className="about-cta">
            <Link to="/about" className="btn"><span className="dot">+</span>More About Us</Link>
          </div>
        )}
      </div>
    </section>
  )
}
