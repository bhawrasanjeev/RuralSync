const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Scheme title is required'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Scheme category is required'],
      enum: ['Agriculture', 'Housing', 'Health', 'Employment', 'Women & Child', 'Financial Inclusion', 'Clean Energy', 'Social Welfare'],
      default: 'Agriculture',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    eligibility: {
      type: [String],
      required: true,
      default: [],
    },
    requiredDocuments: {
      type: [String],
      required: true,
      default: [],
    },
    benefits: {
      type: String,
      required: [true, 'Benefits detail is required'],
      trim: true,
    },
    officialLink: {
      type: String,
      required: [true, 'Official application link is required'],
      trim: true,
    },
    applyMode: {
      type: String,
      enum: ['Online', 'Offline', 'Hybrid'],
      default: 'Online',
    },
    status: {
      type: String,
      enum: ['Active', 'Ongoing', 'Upcoming', 'Closed'],
      default: 'Active',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Optimize text search index for scheme title, category, and shortDescription
schemeSchema.index({ title: 'text', category: 'text', shortDescription: 'text' });

module.exports = mongoose.model('Scheme', schemeSchema);
