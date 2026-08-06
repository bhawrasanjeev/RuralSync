const express = require('express');
const router = express.Router();
const { schemes } = require('../data/store');

router.get('/', (req, res) => {
  const { category, search } = req.query;
  let filtered = [...schemes];

  if (category && category !== 'All') {
    filtered = filtered.filter((s) => s.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
  }

  res.json(filtered);
});

router.get('/:id', (req, res) => {
  const scheme = schemes.find((s) => s.id === req.params.id);
  if (!scheme) {
    return res.status(404).json({ message: 'Scheme not found' });
  }
  res.json(scheme);
});

router.post('/apply', (req, res) => {
  const { schemeId, applicantName } = req.body;
  const scheme = schemes.find((s) => s.id === schemeId);

  if (!scheme) {
    return res.status(404).json({ message: 'Scheme not found' });
  }

  scheme.appliedCount = (scheme.appliedCount || 0) + 1;

  res.status(201).json({
    message: `Application submitted successfully for ${scheme.title}`,
    applicationNo: `APP-${Date.now()}`,
    status: 'Under Verification',
    schemeTitle: scheme.title,
    applicantName,
    dateSubmitted: new Date().toISOString().split('T')[0],
  });
});

module.exports = router;
