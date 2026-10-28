import { NavLink } from 'react-router-dom'
import { useMenu } from './MenuContext.jsx'

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
]

export default function Menu() {
  const { setMenu } = useMenu()
  return (
    <nav className="menu" id="menu" aria-label="Main menu">
      <div className="mo mo1"></div>
      <div className="mo mo2"></div>
      <div className="wrap">
        <ol>
          {NAV.map((n, i) => (
            <li key={n.to}>
              <span className="idx">{String(i + 1).padStart(2, '0')}.</span>
              <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => 'big' + (isActive ? ' cur' : '')} onClick={() => setMenu(false)}>
                {n.label}
              </NavLink>
            </li>
          ))}
        </ol>
        <aside>
          <div><strong>Say hello</strong>hello@adventatek.com</div>
          <div><strong>Based in</strong>Karachi, Pakistan · working with US &amp; PK brands</div>
        </aside>
      </div>
    </nav>
  )
}
