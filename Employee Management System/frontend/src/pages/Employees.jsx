import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getEmployees, deleteEmployee, getDepartments } from '../lib/api'
import { formatCurrency, formatDate } from '../lib/format'
import { clearSession } from '../lib/auth'

function SearchIcon() {
  return (
    <svg
      className="h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
      />
    </svg>
  )
}

const PAGE_SIZE = 10

function getPageNumbers(current, total) {
  const pages = []
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      pages.push(i)
    }
  }

  const withEllipsis = []
  let prev
  for (const page of pages) {
    if (prev && page - prev > 1) {
      withEllipsis.push('...')
    }
    withEllipsis.push(page)
    prev = page
  }
  return withEllipsis
}

function Employees() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getDepartments()
      .then(setDepartments)
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    setPage(1)
  }, [search, department])

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadEmployees()
    }, 300)
    return () => clearTimeout(timeout)
  }, [search, department, page])

  async function loadEmployees() {
    setLoading(true)
    try {
      const result = await getEmployees({ search, department, page, limit: PAGE_SIZE })
      setEmployees(result.data)
      setTotal(result.total)
      setTotalPages(result.totalPages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this employee?')) return
    try {
      await deleteEmployee(id)
      loadEmployees()
    } catch (err) {
      alert(err.message)
    }
  }

  function handleLogout() {
    clearSession()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
            <p className="mt-1 text-sm text-gray-500">
              {loading ? 'Loading...' : `${total} ${total === 1 ? 'employee' : 'employees'}`}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Logout
            </button>
            <Link
              to="/employees/new"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              + Add Employee
            </Link>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or designation"
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Employee
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Department
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Designation
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Salary
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Joined
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-500">
                      Loading employees...
                    </td>
                  </tr>
                ) : employees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-500">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr key={emp._id} className="transition-colors hover:bg-gray-50">
                      <td className="whitespace-nowrap px-5 py-3">
                        <div className="font-medium text-gray-900">{emp.name}</div>
                        <div className="text-xs text-gray-500">{emp.email}</div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-gray-600">
                        {emp.department}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-gray-600">
                        {emp.designation}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 font-medium text-gray-900">
                        {formatCurrency(emp.salary)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-gray-500">
                        {formatDate(emp.joiningDate)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3">
                        <div className="flex items-center gap-1">
                          <Link
                            to={`/employees/${emp._id}`}
                            className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                          >
                            View
                          </Link>
                          <Link
                            to={`/employees/${emp._id}/edit`}
                            className="rounded-md px-2 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(emp._id)}
                            className="rounded-md px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && employees.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3">
              <p className="text-sm text-gray-500">
                Page {page} of {totalPages} ({total} total)
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                {getPageNumbers(page, totalPages).map((p, i) =>
                  p === '...' ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-sm text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                        p === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Employees
