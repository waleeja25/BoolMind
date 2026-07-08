import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getEmployee } from '../lib/api'

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-100 py-2 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value || '-'}</span>
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

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Employee Details</h1>
          <button
            onClick={() => navigate('/employees')}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            Back
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        {employee && (
          <div className="mt-6">
            <Row label="Name" value={employee.name} />
            <Row label="Email" value={employee.email} />
            <Row label="Phone" value={employee.phone} />
            <Row label="Gender" value={employee.gender} />
            <Row label="Department" value={employee.department} />
            <Row label="Designation" value={employee.designation} />
            <Row label="Salary" value={employee.salary} />
            <Row
              label="Joining Date"
              value={employee.joiningDate?.slice(0, 10)}
            />

            <Link
              to={`/employees/${employee._id}/edit`}
              className="mt-6 block w-full rounded-lg bg-blue-600 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeView
