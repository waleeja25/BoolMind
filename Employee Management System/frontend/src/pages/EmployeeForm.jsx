import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../components/Input'
import Select from '../components/Select'
import Button from '../components/Button'
import { getDepartments, getEmployee, createEmployee, updateEmployee } from '../lib/api'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  gender: '',
  department: '',
  designation: '',
  salary: '',
  joiningDate: '',
}

function EmployeeForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(emptyForm)
  const [departments, setDepartments] = useState([])
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadDepartments()
    if (isEdit) loadEmployee()
  }, [id])

  async function loadDepartments() {
    try {
      const data = await getDepartments()
      setDepartments(data)
    } catch (err) {
      setFormError(err.message)
    }
  }

  async function loadEmployee() {
    try {
      const emp = await getEmployee(id)
      setForm({
        name: emp.name,
        email: emp.email,
        phone: emp.phone || '',
        gender: emp.gender || '',
        department: emp.department || '',
        designation: emp.designation,
        salary: emp.salary,
        joiningDate: emp.joiningDate ? emp.joiningDate.slice(0, 10) : '',
      })
    } catch (err) {
      setFormError(err.message)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    setLoading(true)

    const payload = { ...form, salary: Number(form.salary) }

    try {
      if (isEdit) {
        await updateEmployee(id, payload)
      } else {
        await createEmployee(payload)
      }
      navigate('/employees')
    } catch (err) {
      setFormError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isEdit ? 'Edit Employee' : 'Add Employee'}
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {formError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{formError}</p>
          )}

          <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />

          <Select label="Gender" name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>

          <Select
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Select>

          <Input
            label="Designation"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            required
          />
          <Input
            label="Salary"
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            required
          />
          <Input
            label="Joining Date"
            type="date"
            name="joiningDate"
            value={form.joiningDate}
            onChange={handleChange}
            required
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate('/employees')}
              className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <div className="flex-1">
              <Button type="submit" loading={loading}>
                {isEdit ? 'Save Changes' : 'Add Employee'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeForm
