const express=require('express');

const authRoutes = require('./authRoutes');
const departmentRoutes = require('./departmentRoutes');
const employeeRoutes = require('./employeeRoutes');

const router= express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/departments', departmentRoutes);
router.use('/api/employees', employeeRoutes);

module.exports = router;