const express = require('express');
const router = express.Router();
const { villageStats } = require('../data/store');

router.get('/', (req, res) => {
  res.json(villageStats);
});

module.exports = router;
