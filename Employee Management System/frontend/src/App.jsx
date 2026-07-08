import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Employees from './pages/Employees'
import EmployeeForm from './pages/EmployeeForm'
import EmployeeView from './pages/EmployeeView'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees/new"
        element={
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees/:id"
        element={
          <ProtectedRoute>
            <EmployeeView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees/:id/edit"
        element={
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/employees" replace />} />
    </Routes>
  )
}

export default App
