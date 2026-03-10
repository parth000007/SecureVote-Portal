const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  party: {
    type: String,
    required: true,
    trim: true
  },
  platform: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
