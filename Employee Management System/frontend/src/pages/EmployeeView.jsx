import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getEmployee, deleteEmployee } from '../lib/api'
import { formatCurrency, formatDate } from '../lib/format'

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</div>
      <div className="mt-1 text-sm font-medium text-gray-900">{value || '-'}</div>
    </div>
  )
}

function EmployeeView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getEmployee(id)
      .then(setEmployee)
      .catch((err) => setError(err.message))
  }, [id])

  async function handleDelete() {
    if (!window.confirm('Delete this employee?')) return
    try {
      await deleteEmployee(id)
      navigate('/employees')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => navigate('/employees')}
          className="mb-4 flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          ← Back to Employees
        </button>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        {employee && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-8 py-6">
              <h1 className="text-2xl font-semibold text-gray-900">{employee.name}</h1>
              <p className="mt-1 text-sm text-gray-500">
                {employee.designation} · {employee.department}
              </p>
            </div>

            <div className="px-8 py-6">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Contact
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-6">
                <Field label="Email" value={employee.email} />
                <Field label="Phone" value={employee.phone} />
                <Field label="Gender" value={employee.gender} />
              </div>

              <h2 className="mt-8 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Employment
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-6">
                <Field label="Department" value={employee.department} />
                <Field label="Designation" value={employee.designation} />
                <Field label="Salary" value={formatCurrency(employee.salary)} />
                <Field label="Joining Date" value={formatDate(employee.joiningDate)} />
              </div>
            </div>

            <div className="flex gap-2 border-t border-gray-100 bg-gray-50 px-8 py-4">
              <Link
                to={`/employees/${employee._id}/edit`}
                className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-lg border border-gray-300 bg-white py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeView
