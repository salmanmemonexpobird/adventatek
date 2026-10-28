import { VALUES } from '../data/content.jsx'

export default function Values() {
  return (
    <div className="vals">
      {VALUES.map((v) => <div className="val" key={v.n}><b>{v.n}</b><h3>{v.t}</h3><p>{v.d}</p></div>)}
    </div>
  )
}
