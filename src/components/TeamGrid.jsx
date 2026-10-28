import { TEAM } from '../data/content.jsx'

export default function TeamGrid() {
  return (
    <div className="team-grid">
      {TEAM.map((m, i) => (
        <article className="member" style={{ '--fig': m.fig }} key={i}>
          <h3>{m.name[0]}<br />{m.name[1]}</h3>
          <p className="role">{m.role}</p>
          <a className="in" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label={`${m.role} on LinkedIn`}>in</a>
          <div className="portrait"><div className="figure"></div><span className="letter" aria-hidden="true">{m.letter}</span></div>
        </article>
      ))}
    </div>
  )
}
