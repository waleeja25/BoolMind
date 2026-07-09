const {signup,login} = require('./authController');

const {createEmployee,deleteEmployee,getEmployee,getEmployees,updateEmployee} = require('./employeeController')

module.exports =  {signup,login,createEmployee,deleteEmployee,getEmployee,getEmployees,updateEmployee}