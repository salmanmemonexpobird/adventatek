export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1, 2, 3].map((i) => <span key={i}>Ideas meet innovation —</span>)}
      </div>
    </div>
  )
}
