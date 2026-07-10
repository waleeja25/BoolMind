const { signup, login } = require("./authService");

const {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
} = require("./employeeService");

const { getCache, setCache, delCache } = require("./redisService");

module.exports = {
  signup,
  login,
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  getCache,
  setCache,
  delCache,
};
