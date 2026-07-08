const express = require('express');
const DEPARTMENTS = require('../constants/departments');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(DEPARTMENTS);
});

module.exports = router;
