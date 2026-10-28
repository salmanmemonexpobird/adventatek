import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMenu } from './MenuContext.jsx'
import { asset } from '../utils.js'

export default function Header() {
  const { open, toggle } = useMenu()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Header: solid after 80px, hides on scroll down and returns on scroll up
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (document.documentElement.classList.contains('menu-open')) { last = y; return }
      setSolid(y > 80)
      setHidden(y > last && y > 200)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${solid ? ' is-solid' : ''}${hidden ? ' is-hidden' : ''}`} id="header">
      <div className="wrap">
        <Link to="/" className="logo" aria-label="Adventa Tek home">
          <img src={asset('media/logo.png')} alt="Adventa Tek" />
        </Link>
        <button className="burger" id="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="menu" onClick={toggle}>
          <span></span><span></span>
        </button>
        <Link to="/projects" className="showcase-link">
          <span className="txt">Showcase</span>
          <span className="plus" aria-hidden="true">+</span>
        </Link>
      </div>
    </header>
  )
}
