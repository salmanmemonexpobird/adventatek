import { useEffect } from 'react'

// The page slides off to uncover a fixed footer (only when the footer fits on screen)
export default function useFooterReveal(dep) {
  useEffect(() => {
    const root = document.documentElement
    const footer = document.querySelector('.site-footer')
    if (!footer) return
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const set = () => {
      const main = document.querySelector('main')
      if (!main) return
      root.classList.remove('reveal')
      main.style.marginBottom = ''
      const h = footer.offsetHeight
      if (!reduced && h < window.innerHeight * 0.9) {
        root.classList.add('reveal')
        main.style.marginBottom = h + 'px'
      }
    }
    const raf = requestAnimationFrame(set)
    window.addEventListener('resize', set)
    document.fonts?.ready.then(set)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', set)
      root.classList.remove('reveal')
    }
  }, [dep])
}
