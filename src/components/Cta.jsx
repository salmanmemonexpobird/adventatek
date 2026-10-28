import { Link } from 'react-router-dom'

export default function Cta() {
  return (
    <section className="cta">
      <div className="wrap">
        <h2>Have a project in mind?</h2>
        <Link to="/contact" className="btn"><span className="dot">+</span>Let's talk</Link>
      </div>
    </section>
  )
}
