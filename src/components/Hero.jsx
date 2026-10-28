import AutoVideo from './AutoVideo.jsx'
import useMediaQuery from '../hooks/useMediaQuery.js'
import { asset } from '../utils.js'

// Only the video that fits the screen is loaded
export default function Hero() {
  const mobile = useMediaQuery('(max-width:700px)')
  return (
    <section className="hero" id="top">
      <h1>Adventa Tek, a brand and technology studio</h1>
      {mobile
        ? <AutoVideo key="m" className="v-mobile" src={asset('media/hero-mobile.mp4')} />
        : <AutoVideo key="d" className="v-desktop" src={asset('media/hero-desktop.mp4')} />}
    </section>
  )
}
