const {
  listEmployees,
  getEmployeeById,
  createEmployee: createEmployeeService,
  updateEmployeeById,
  deleteEmployeeById,
} = require("../services");

async function getEmployees(req, res) {
  try {
    const result = await listEmployees(req.query);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch employees",
      err: err.message,
    });
  }
}

async function getEmployee(req, res) {
  try {
    const employee = await getEmployeeById(req.params.id);
    res.json(employee);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch employees",
      err: err.message,
    });
  }
}

async function createEmployee(req, res) {
  try {
    const employee = await createEmployeeService(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create employees",
      err: err.message,
    });
  }
}

async function updateEmployee(req, res) {
  try {
    const employee = await updateEmployeeById(req.params.id, req.body);
    res.json(employee);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update employees",
      err: err.message,
    });
  }
}

async function deleteEmployee(req, res) {
  try {
    await deleteEmployeeById(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete employees",
      err: err.message,
    });
  }
}

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
