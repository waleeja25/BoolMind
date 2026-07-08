const STORAGE_KEY = 'auth'

export function saveSession({ token, user }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }))
}

export function getSession() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : null
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
}

export function isAuthenticated() {
  return Boolean(getSession()?.token)
}
