const { signup, login } = require('./authService');
const {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
} = require('./employeeService');

module.exports = {
  signup,
  login,
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
};
