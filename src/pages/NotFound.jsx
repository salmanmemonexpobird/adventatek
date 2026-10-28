import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function NotFound() {
  usePageMeta('Page not found | Adventa Tek')
  return (
    <main>
      <PageHero crumb="404" title={<>Lost<em>?</em></>} lead="That page does not exist. Head back home or tell us what you were looking for." />
      <section className="light sec">
        <div className="wrap"><Link to="/" className="btn"><span className="dot">+</span>Back to home</Link></div>
      </section>
    </main>
  )
}
