import { useState } from 'react'
import { postForm } from '../api.js'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [hp, setHp] = useState('')
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  async function onSubmit(e) {
    e.preventDefault()
    if (status.state === 'sending') return
    setStatus({ state: 'sending', msg: '' })
    const res = await postForm('newsletter.php', { email, website: hp })
    setStatus({ state: res.ok ? 'ok' : 'error', msg: res.message })
    if (res.ok) setEmail('')
  }

  return (
    <div className="news">
      <div>
        <p className="eyebrow-s">SIGN UP TO GET THE LATEST NEWS</p>
        <h3>Subscribe Newsletter</h3>
      </div>
      <form className="news-form" onSubmit={onSubmit} noValidate>
        <input type="email" name="email" placeholder="Enter your email" aria-label="Email address" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        {/* honeypot: real visitors never see or fill this */}
        <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} />
        <button type="submit" disabled={status.state === 'sending'}>{status.state === 'sending' ? 'Sending…' : 'Subscribe'}</button>
        <p className={`form-msg ${status.state}`} role="status" aria-live="polite">{status.msg}</p>
      </form>
    </div>
  )
}
