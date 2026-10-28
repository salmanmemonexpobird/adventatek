import { useEffect, useRef, useState } from 'react'

// Muted looping video. With `lazy` it only loads once it is near the viewport.
export default function AutoVideo({ src, lazy = false, ...rest }) {
  const ref = useRef(null)
  const [on, setOn] = useState(!lazy)

  useEffect(() => {
    if (!lazy || on) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { rootMargin: '300px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [lazy, on])

  useEffect(() => {
    const v = ref.current
    if (v && on) { v.muted = true; v.play().catch(() => {}) }
  }, [on, src])

  return <video ref={ref} src={on ? src : undefined} muted loop playsInline autoPlay preload="none" aria-hidden="true" {...rest} />
}
