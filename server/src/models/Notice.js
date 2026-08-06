const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Notice title is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Circular', 'Tender', 'Ration Distribution', 'Health Camp', 'Governance Notice', 'General Notice'],
      default: 'Circular',
    },
    summary: {
      type: String,
      required: [true, 'Notice summary is required'],
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: 'Gram Panchayat Office',
      trim: true,
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
    pinnedNotice: {
      type: Boolean,
      default: false,
    },
    fileSize: {
      type: String,
      default: '1.2 MB PDF',
    },
    issuer: {
      type: String,
      default: 'Panchayat Secretary & Sarpanch',
    },
  },
  {
    timestamps: true,
  }
);

noticeSchema.index({ title: 'text', summary: 'text', category: 'text' });

module.exports = mongoose.model('Notice', noticeSchema);
