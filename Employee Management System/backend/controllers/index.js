const {signup, login, logout} = require('./authController');

const {createEmployee,deleteEmployee,getEmployee,getEmployees,updateEmployee} = require('./employeeController')

module.exports =  {signup,login,logout,createEmployee,deleteEmployee,getEmployee,getEmployees,updateEmployee}