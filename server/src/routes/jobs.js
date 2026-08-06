const express = require('express');
const router = express.Router();
const { jobs } = require('../data/store');

router.get('/', (req, res) => {
  res.json(jobs);
});

router.post('/apply', (req, res) => {
  const { jobId, applicantName } = req.body;
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return res.status(404).json({ message: 'Job posting not found' });
  }

  res.status(201).json({
    message: `Demand registered for ${job.title}`,
    applicationId: `MGNREGA-${Date.now()}`,
    jobTitle: job.title,
    applicantName,
    date: new Date().toISOString().split('T')[0],
  });
});

module.exports = router;
