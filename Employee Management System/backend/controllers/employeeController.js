const Employee = require('../models/Employee');

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function getEmployees(req, res) {
  const { search, department, joinedFrom, joinedTo } = req.query;
  const filter = {};

  if (search) {
    const regex = new RegExp(escapeRegex(search), 'i');
    filter.$or = [{ name: regex }, { email: regex }, { designation: regex }];
  }

  if (department) {
    filter.department = department;
  }

  if (joinedFrom || joinedTo) {
    filter.joiningDate = {};

    if (joinedFrom) {
      const from = new Date(joinedFrom);
      if (!isNaN(from)) filter.joiningDate.$gte = from;
    }

    if (joinedTo) {
      const to = new Date(joinedTo);
      if (!isNaN(to)) {
        to.setHours(23, 59, 59, 999);
        filter.joiningDate.$lte = to;
      }
    }

    if (Object.keys(filter.joiningDate).length === 0) delete filter.joiningDate;
  }

  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const skip = (page - 1) * limit;
  const sortDir = req.query.sort === 'asc' ? 1 : -1;

  const [employees, total] = await Promise.all([
    Employee.find(filter)
      .sort({ joiningDate: sortDir, _id: sortDir })
      .skip(skip)
      .limit(limit),
    Employee.countDocuments(filter),
  ]);

  res.json({
    data: employees,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
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
