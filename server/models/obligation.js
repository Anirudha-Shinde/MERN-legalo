// Location: mern/server/models/obligation.js

const mongoose = require('mongoose');

const ObligationSchema = new mongoose.Schema({
  obligationId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  appliesIf: {
    type: String,
    required: true
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high'], // Restrict to these values
    required: true
  },
  completionDefinition: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Obligation', ObligationSchema);