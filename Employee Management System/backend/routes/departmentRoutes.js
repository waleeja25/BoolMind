const express = require('express');
const { DEPARTMENTS, authMiddleware } = require('../lib');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.json(DEPARTMENTS);
});

module.exports = router;
