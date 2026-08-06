const express = require('express');
const router = express.Router();
const { notices } = require('../data/store');

router.get('/', (req, res) => {
  res.json(notices);
});

router.post('/', (req, res) => {
  const { title, category, content, urgent, issuer } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and Content are required' });
  }

  const newNotice = {
    id: `NOT-${Date.now()}`,
    title,
    category: category || 'General Notice',
    date: new Date().toISOString().split('T')[0],
    urgent: !!urgent,
    content,
    issuer: issuer || 'Gram Panchayat Office',
  };

  notices.unshift(newNotice);
  res.status(201).json(newNotice);
});

module.exports = router;
