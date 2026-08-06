const express = require('express');
const router = express.Router();
const { emergencyHelplines } = require('../data/store');

router.get('/', (req, res) => {
  res.json(emergencyHelplines);
});

module.exports = router;
