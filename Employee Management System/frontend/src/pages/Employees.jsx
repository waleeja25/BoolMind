import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getEmployees, deleteEmployee } from '../lib/api'

function Employees() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadEmployees()
  }, [])

  async function loadEmployees() {
    setLoading(true)
    try {
      const data = await getEmployees()
      setEmployees(data)
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
      setEmployees((prev) => prev.filter((emp) => emp._id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <Link
              to="/employees/new"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add Employee
            </Link>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Designation</th>
                <th className="px-4 py-3 font-medium">Salary</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    No employees yet.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp._id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 text-gray-900">{emp.name}</td>
                    <td className="px-4 py-3 text-gray-600">{emp.email}</td>
                    <td className="px-4 py-3 text-gray-600">{emp.department}</td>
                    <td className="px-4 py-3 text-gray-600">{emp.designation}</td>
                    <td className="px-4 py-3 text-gray-600">{emp.salary}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <Link to={`/employees/${emp._id}`} className="text-blue-600 hover:underline">
                          View
                        </Link>
                        <Link
                          to={`/employees/${emp._id}/edit`}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(emp._id)}
                          className="text-red-600 hover:underline"
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
      </div>
    </div>
  )
}

export default Employees
