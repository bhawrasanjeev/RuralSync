const express = require('express');
const router = express.Router();
const { complaints } = require('../data/store');

router.get('/', (req, res) => {
  const { wardNo, status } = req.query;
  let list = [...complaints];

  if (wardNo) {
    list = list.filter((c) => c.wardNo.toString() === wardNo.toString());
  }

  if (status) {
    list = list.filter((c) => c.status.toLowerCase() === status.toLowerCase());
  }

  res.json(list);
});

router.post('/', (req, res) => {
  const { title, category, description, location, wardNo } = req.body;

  if (!title || !category || !description) {
    return res.status(400).json({ message: 'Title, Category, and Description are required' });
  }

  const newComplaint = {
    id: `CMP-${Date.now()}`,
    ticketNo: `CH-2025-${Math.floor(1000 + Math.random() * 9000)}`,
    title,
    category,
    description,
    location: location || 'Gram Panchayat Chandanpura',
    wardNo: wardNo || 1,
    dateSubmitted: new Date().toISOString().split('T')[0],
    status: 'Submitted',
    assignedTo: 'Ward Officer & Panchayat Jal Mitr',
    priority: req.body.priority || 'Medium',
    upvotes: 1,
    userUpvoted: true,
    timeline: [
      {
        stage: 'Grievance Registered',
        date: new Date().toLocaleString(),
        description: 'Grievance submitted via RuralSync portal with GPS verification.',
        completed: true,
      },
      {
        stage: 'Ward Officer Review',
        date: 'Pending',
        description: 'Awaiting Sarpanch / Ward Member assignment.',
        completed: false,
      },
    ],
  };

  complaints.unshift(newComplaint);
  res.status(201).json(newComplaint);
});

router.put('/:id/upvote', (req, res) => {
  const complaint = complaints.find((c) => c.id === req.params.id);
  if (!complaint) {
    return res.status(404).json({ message: 'Complaint not found' });
  }

  if (complaint.userUpvoted) {
    complaint.upvotes = Math.max(0, complaint.upvotes - 1);
    complaint.userUpvoted = false;
  } else {
    complaint.upvotes += 1;
    complaint.userUpvoted = true;
  }

  res.json(complaint);
});

module.exports = router;
