import { Link } from 'react-router-dom'

export default function PageHero({ crumb, title, lead }) {
  return (
    <section className="page-hero">
      <div className="pxs" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div className="wrap">
        <p className="crumb"><Link to="/">Home</Link><i>/</i>{crumb}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  )
}
