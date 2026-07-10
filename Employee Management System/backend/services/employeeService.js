const redisService = require("./redisService");
const Employee = require("../models/Employee");
const { ApiError } = require("../lib");

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function listEmployees(query) {
  const { search, department, joinedFrom, joinedTo } = query;
  const filter = {};

  if (search) {
    const regex = new RegExp(escapeRegex(search), "i");
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
  const sortDir = query.sort === "asc" ? 1 : -1;

  const cacheKey = `employees:${JSON.stringify(query)}`;
  const cachedData = await redisService.getCache(cacheKey);

  if (cachedData) {
    console.log("Cache Hit! (Get All/Filtered Employees) -Data from Redis");
    return JSON.parse(cachedData);
  }

  console.log("Cache Miss! (Get All/Filtered Employees) -Data from MongoDB");

  const [employees, total] = await Promise.all([
    Employee.find(filter)
      .sort({ joiningDate: sortDir, _id: sortDir })
      .skip(skip)
      .limit(limit),
    Employee.countDocuments(filter),
  ]);

  const result = {
    data: employees,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };

  await redisService.setCache(cacheKey, JSON.stringify(result), 180);

  return result;
}

async function getEmployeeById(id) {
  const cacheKey = `employee:${id}`;
  const cachedData = await redisService.getCache(cacheKey);

  if (cachedData) {
    console.log(
      `Cache Hit! (Get Employee By Id) -Data from Redis with EmployeeId: ${id}`,
    );
    return JSON.parse(cachedData);
  }

  console.log(
    `Cache Miss! (Get Employee By Id) -Data from MongoDB with EmployeeId: ${id}`,
  );

  const employee = await Employee.findById(id);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  await redisService.setCache(cacheKey, JSON.stringify(employee), 180);

  return employee;
}

async function createEmployee(data) {
  try {
    const employee = await Employee.create(data);

    await redisService.delCache("employees:*");
    console.log(
      "Cache Invalidation(New Employee Added)! - Deleting data from cache",
    );

    return employee;
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(409, "Email already in use");
    }
    throw new ApiError(400, "Failed to create employee");
  }
}

async function updateEmployeeById(id, data) {
  try {
    const employee = await Employee.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }

    await redisService.delCache(`employee:${id}`);
    await redisService.delCache("employees:*");

    console.log(
      "Cache Invalidation(Employee Updated)! - Deleting data from cache",
    );

    return employee;
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(409, "Email already in use");
    }
    throw new ApiError(400, "Failed to update employee");
  }
}

async function deleteEmployeeById(id) {
  const employee = await Employee.findByIdAndDelete(id);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  await redisService.delCache(`employee:${id}`);
  await redisService.delCache("employees:*");

  console.log(
    "Cache Invalidation(Employee Deleted)! - Deleting data from cache",
  );
}

module.exports = {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
};
