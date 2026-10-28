import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { postForm } from '../api.js'

const SERVICES = ['Branding', 'Digital', 'Development', 'Not sure yet']
const EMPTY = { name: '', email: '', phone: '', service: 'Branding', message: '', website: '' }

export default function Contact() {
  usePageMeta('Contact | Adventa Tek', 'Tell Adventa Tek about your project. We reply within 24 hours.')
  const [f, setF] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  function validate() {
    const e = {}
    if (f.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.'
    if (f.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).'
    return e
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    if (status.state === 'sending') return
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setStatus({ state: 'sending', msg: '' })
    const res = await postForm('contact.php', f)
    setStatus({ state: res.ok ? 'ok' : 'error', msg: res.message })
    if (res.ok) setF(EMPTY)
  }

  return (
    <main>
      <PageHero crumb="Contact" title={<>Let's <em>talk.</em></>} lead="Tell us about your project. We reply within 24 hours, usually sooner." />
      <section className="light sec">
        <div className="wrap contact-grid">
          <aside className="contact-info">
            <h2>Say hello</h2>
            <dl>
              <div><dt>Email</dt><dd><a href="mailto:hello@adventatek.com">hello@adventatek.com</a></dd></div>
              <div><dt>Phone</dt><dd><a href="tel:+923000000000">+92 300 0000000</a></dd></div>
              <div><dt>Based in</dt><dd>Karachi, Sindh, Pakistan</dd></div>
              <div><dt>Working with</dt><dd>Brands in Pakistan and the US</dd></div>
            </dl>
          </aside>
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="row2">
              <label className={'field' + (errors.name ? ' bad' : '')}>
                <span>Name *</span>
                <input type="text" name="name" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} />
                {errors.name && <em>{errors.name}</em>}
              </label>
              <label className={'field' + (errors.email ? ' bad' : '')}>
                <span>Email *</span>
                <input type="email" name="email" autoComplete="email" value={f.email} onChange={set('email')} aria-invalid={!!errors.email} />
                {errors.email && <em>{errors.email}</em>}
              </label>
            </div>
            <label className="field">
              <span>Phone / WhatsApp</span>
              <input type="tel" name="phone" autoComplete="tel" value={f.phone} onChange={set('phone')} />
            </label>
            <fieldset className="chips">
              <legend>What do you need?</legend>
              {SERVICES.map((s) => (
                <label key={s} className={f.service === s ? 'on' : ''}>
                  <input type="radio" name="service" value={s} checked={f.service === s} onChange={set('service')} />{s}
                </label>
              ))}
            </fieldset>
            <label className={'field' + (errors.message ? ' bad' : '')}>
              <span>Project details *</span>
              <textarea name="message" rows="6" value={f.message} onChange={set('message')} aria-invalid={!!errors.message}></textarea>
              {errors.message && <em>{errors.message}</em>}
            </label>
            <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={set('website')} />
            <div className="submit-row">
              <button type="submit" className="btn" disabled={status.state === 'sending'}>
                <span className="dot">+</span>{status.state === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p className={'form-msg-lg ' + status.state} role="status" aria-live="polite">{status.msg}</p>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
