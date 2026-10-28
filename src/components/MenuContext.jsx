import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const Ctx = createContext(null)
export const useMenu = () => useContext(Ctx)

// Menu has three stages, same as the original: visible -> open (overlays wipe in) -> ready (items stagger in)
export function MenuProvider({ children }) {
  const [state, setState] = useState({ visible: false, open: false, ready: false })
  const t = useRef({})

  const clear = () => Object.values(t.current).forEach(clearTimeout)

  const setMenu = useCallback((open) => {
    clear()
    if (open) {
      setState({ visible: true, open: true, ready: false })
      document.body.style.overflow = 'hidden'
      t.current.ready = setTimeout(() => setState((s) => ({ ...s, ready: true })), 600)
    } else {
      setState((s) => ({ ...s, ready: false }))
      t.current.open = setTimeout(() => setState((s) => ({ ...s, open: false })), 300)
      t.current.vis = setTimeout(() => {
        setState({ visible: false, open: false, ready: false })
        document.body.style.overflow = ''
      }, 1600)
    }
  }, [])

  // Mirror the state as classes on <html>, which the stylesheet uses
  useEffect(() => {
    const c = document.documentElement.classList
    c.toggle('menu-visible', state.visible)
    c.toggle('menu-open', state.open)
    c.toggle('menu-ready', state.ready)
  }, [state])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenu(false)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); clear() }
  }, [setMenu])

  const toggle = () => setMenu(!state.open)
  return <Ctx.Provider value={{ ...state, setMenu, toggle }}>{children}</Ctx.Provider>
}
