import Stats from './Stats.jsx'

export default function Culture() {
  return (
    <section className="light culture">
      <div className="wrap">
        <div className="cul-grid">
          <div className="cul-a">
            <div className="torn"></div>
            <p>At Adventa Tek,<br />shipping isn't <em>a</em> phase</p>
            <div className="slash"></div>
            <span className="px" style={{ left: 24, top: 22 }}>&lt;build/&gt;</span>
            <span className="px" style={{ right: 24, bottom: 22 }}>v.2026</span>
          </div>
          <div className="cul-b">
            <span className="word w1">Ideas</span><span className="word w2">Code</span><span className="word w3">Craft</span>
            <p className="big">It's <em>a</em><br /><em>habit</em></p>
          </div>
        </div>
        <Stats />
      </div>
    </section>
  )
}
