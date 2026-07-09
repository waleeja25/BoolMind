const Employee = require('../models/Employee');
const { ApiError } = require('../lib');

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function listEmployees(query) {
  
  const { search, department, joinedFrom, joinedTo } = query;
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


  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
  const skip = (page - 1) * limit;
  const sortDir = query.sort === 'asc' ? 1 : -1;

  const [employees, total] = await Promise.all([
    Employee.find(filter)
      .sort({ joiningDate: sortDir, _id: sortDir })
      .skip(skip)
      .limit(limit),
    Employee.countDocuments(filter),
  ]);

  return {
    data: employees,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

async function getEmployeeById(id) {
  
  const employee = await Employee.findById(id);
  if (!employee) {
    throw new ApiError(404, 'Employee not found');
  }
  return employee;
}

async function createEmployee(data) {
  
  try {
    return await Employee.create(data);
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(409, 'Email already in use');
    }
    throw new ApiError(400, 'Failed to create employee');
  }
}

async function updateEmployeeById(id, data) {
  
  try {
    const employee = await Employee.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    
    if (!employee) {
      throw new ApiError(404, 'Employee not found');
    }
    return employee;
  } catch (err) {
    
    if (err.code === 11000) {
      throw new ApiError(409, 'Email already in use');
    }
    throw new ApiError(400, 'Failed to update employee');
  }
}

async function deleteEmployeeById(id) {
  const employee = await Employee.findByIdAndDelete(id);
  
  if (!employee) {
    throw new ApiError(404, 'Employee not found');
  }
}

module.exports = {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
};
