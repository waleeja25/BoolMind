import { Link, useNavigate } from 'react-router-dom'
import { getSession, clearSession } from '../lib/auth'

function Dashboard() {
  const navigate = useNavigate()
  const session = getSession()

  function handleLogout() {
    clearSession()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome, {session?.user?.username}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{session?.user?.email}</p>
        <Link
          to="/employees"
          className="mt-6 block w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Manage Employees
        </Link>
        <button
          onClick={handleLogout}
          className="mt-6 w-full rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Log out
        </button>
      </div>
    </div>
  )
}

export default Dashboard
