const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email) {
  if (!email) return 'Email is required'
  if (!EMAIL_REGEX.test(email)) return 'Enter a valid email address'
  return ''
}

export function validateUsername(username) {
  if (!username) return 'Username is required'
  if (username.length < 3) return 'Username must be at least 3 characters'
  return ''
}

export function validatePassword(password) {
  if (!password) return 'Password is required'
  if (password.length < 6) return 'Password must be at least 6 characters'
  return ''
}
