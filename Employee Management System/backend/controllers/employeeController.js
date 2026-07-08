const Employee = require('../models/Employee');

async function getEmployees(req, res) {
  const employees = await Employee.find().sort({ createdAt: -1 });
  res.json(employees);
}

async function getEmployee(req, res) {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  res.json(employee);
}

async function createEmployee(req, res) {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    res.status(400).json({ message: 'Failed to create employee', error: err.message });
  }
}

async function updateEmployee(req, res) {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    res.status(400).json({ message: 'Failed to update employee', error: err.message });
  }
}

async function deleteEmployee(req, res) {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  res.json({ message: 'Employee deleted' });
}

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };
