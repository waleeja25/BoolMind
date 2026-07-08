import { getSession } from './auth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const token = getSession()?.token

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong')
  }
  return data
}

export function signup({ username, email, password }) {
  return request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  })
}

export function login({ email, password }) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function getDepartments() {
  return request('/departments')
}

export function getEmployees({ search, department } = {}) {
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (department) params.set('department', department)
  const query = params.toString()
  return request(`/employees${query ? `?${query}` : ''}`)
}

export function getEmployee(id) {
  return request(`/employees/${id}`)
}

export function createEmployee(data) {
  return request('/employees', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateEmployee(id, data) {
  return request(`/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteEmployee(id) {
  return request(`/employees/${id}`, {
    method: 'DELETE',
  })
}
