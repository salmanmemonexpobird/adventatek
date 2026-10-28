import { API_BASE } from './utils.js'

// POST JSON to the PHP backend. Always resolves to { ok, message } so forms can show a clear result.
export async function postForm(endpoint, data) {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'fetch' },
      body: JSON.stringify(data),
    })
    const text = await res.text()
    let json = null
    try { json = JSON.parse(text) } catch { /* not JSON */ }
    if (!json) return { ok: false, message: 'The server did not respond correctly. Please email us at hello@adventatek.com.' }
    return { ok: !!json.ok, message: json.message || (json.ok ? 'Thank you!' : 'Something went wrong.') }
  } catch {
    return { ok: false, message: 'Could not reach the server. Please check your connection or email hello@adventatek.com.' }
  }
}
