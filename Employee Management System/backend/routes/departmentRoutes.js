const express = require('express');
const DEPARTMENTS = require('../constants/departments');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.json(DEPARTMENTS);
});

module.exports = router;
