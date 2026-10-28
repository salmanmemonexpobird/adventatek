import { useEffect, useRef, useState } from 'react'

const STATS = [
  { to: 8, suffix: '+', label: 'Years Building' },
  { to: 2, suffix: '', label: 'Countries Served' },
  { to: 6, suffix: '', label: 'Core Services' },
  { to: 24, suffix: 'h', label: 'Response Time' },
]

function Stat({ to, suffix, label }) {
  const ref = useRef(null)
  const [v, setV] = useState(to) // final value is the default, so it is right even if JS observers fail

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches || !('IntersectionObserver' in window)) return
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now(), d = 1400
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / d)
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))))
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      setV(0)
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])

  return <div className="stat"><b ref={ref}>{v}{suffix}</b><span>{label}</span></div>
}

export default function Stats() {
  return <div className="stats" id="stats">{STATS.map((s) => <Stat key={s.label} {...s} />)}</div>
}
