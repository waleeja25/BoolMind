const {
  listEmployees,
  getEmployeeById,
  createEmployee: createEmployeeService,
  updateEmployeeById,
  deleteEmployeeById,
} = require('../services');

function sendError(err, res, fallbackMessage) {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message, ...(err.extra || {}) });
  }
  res.status(500).json({ message: fallbackMessage, error: err.message });
}

async function getEmployees(req, res) {
  try {
    const result = await listEmployees(req.query);
    res.json(result);
  } catch (err) {
    sendError(err, res, 'Failed to fetch employees');
  }
}

async function getEmployee(req, res) {
  try {
    const employee = await getEmployeeById(req.params.id);
    res.json(employee);
  } catch (err) {
    sendError(err, res, 'Failed to fetch employee');
  }
}

async function createEmployee(req, res) {
  try {
    const employee = await createEmployeeService(req.body);
    res.status(201).json(employee);
  } catch (err) {
    sendError(err, res, 'Failed to create employee');
  }
}

async function updateEmployee(req, res) {
  try {
    const employee = await updateEmployeeById(req.params.id, req.body);
    res.json(employee);
  } catch (err) {
    sendError(err, res, 'Failed to update employee');
  }
}

async function deleteEmployee(req, res) {
  try {
    await deleteEmployeeById(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    sendError(err, res, 'Failed to delete employee');
  }
}

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };
