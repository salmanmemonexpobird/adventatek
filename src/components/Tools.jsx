import { asset } from '../utils.js'

// 38 client logos in public/media/clients, split across two rows that scroll in opposite directions
const LOGOS = Array.from({ length: 38 }, (_, i) => `client-${String(i + 1).padStart(2, '0')}.png`)
const ROWS = [LOGOS.slice(0, 19), LOGOS.slice(19)]

export default function Tools() {
  return (
    <section className="light tools clients" id="clients">
      <div className="wrap"><h2>Our Clients</h2></div>
      {ROWS.map((row, r) => (
        <div className={'tool-row' + (r === 1 ? ' rev' : '')} key={r}>
          <div className="tool-track">
            {[...row, ...row].map((f, i) => (
              <span className="tool logo" key={i}>
                <img src={asset('media/clients/' + f)} alt="" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
