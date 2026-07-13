const { signup, login, logout } = require("./authService");

const {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
} = require("./employeeService");

module.exports = {
  signup,
  login,
  logout,
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
};
