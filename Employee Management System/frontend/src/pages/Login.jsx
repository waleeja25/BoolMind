import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import Input from '../components/Input'
import Button from '../components/Button'
import { validateEmail, validatePassword } from '../lib/validators'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    }
    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    setLoading(true)
    // TODO: wire up to backend login endpoint
    setTimeout(() => setLoading(false), 800)
  }

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
        />
        <Button type="submit" loading={loading}>
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthCard>
  )
}

export default Login
