import { TOOLS } from '../data/content.jsx'

export default function Tools() {
  return (
    <section className="light tools">
      <div className="wrap"><h2>The stack we build your brand on</h2></div>
      <div className="tool-row">
        <div className="tool-track">
          {[...TOOLS, ...TOOLS].map(([n, k], i) => <span className="tool" key={i}>{n}<small>{k}</small></span>)}
        </div>
      </div>
    </section>
  )
}
