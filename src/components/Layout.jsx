import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MenuProvider } from './MenuContext.jsx'
import Header from './Header.jsx'
import Menu from './Menu.jsx'
import Footer from './Footer.jsx'
import useFooterReveal from '../hooks/useFooterReveal.js'

function Shell() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useFooterReveal(pathname)
  return (
    <>
      <Header />
      <Menu />
      <Outlet />
      <Footer />
    </>
  )
}

export default function Layout() {
  return (
    <MenuProvider>
      <Shell />
    </MenuProvider>
  )
}
