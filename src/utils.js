// Works for both the normal build (base "/") and the preview build (base "./")
export const asset = (p) => `${import.meta.env.BASE_URL}${p}`
// PHP backend location. Override with VITE_API_BASE if the API lives somewhere else.
export const API_BASE = import.meta.env.VITE_API_BASE || '/api'
