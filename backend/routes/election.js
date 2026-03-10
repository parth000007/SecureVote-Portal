const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const { protect, adminOnly } = require('../middleware/auth');
const crypto = require('crypto');

// Normally we'd integrate ethers.js here to interact with the Smart Contract
// For simplicity in this mockup API, we simulate returning the interaction payload

// @desc    Get all candidates
// @route   GET /api/election/candidates
router.get('/candidates', protect, async (req, res) => {
  try {
    const candidates = await Candidate.find({}).sort('candidateId');
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Add a candidate (Admin only)
// @route   POST /api/election/candidates
router.post('/candidates', protect, adminOnly, async (req, res) => {
  try {
    const { name, party, platform, imageUrl, candidateId } = req.body;
    
    const count = await Candidate.countDocuments();
    const newId = candidateId || (count + 1);

    const candidateExists = await Candidate.findOne({ candidateId: newId });
    if (candidateExists) {
      return res.status(400).json({ message: 'Candidate ID already exists' });
    }

    const candidate = await Candidate.create({
      candidateId: newId,
      name,
      party,
      platform,
      imageUrl
    });

    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get voting payload (Voter prepares to cast vote on chain)
// @route   POST /api/election/prepare-vote
router.post('/prepare-vote', protect, async (req, res) => {
  try {
    // Generate an anonymous voter hash to use in the smart contract 
    // This ensures one-person-one-vote without tying the wallet to the identity directly
    const voterHash = crypto.createHash('sha256').update(req.user.voterId).digest('hex');
    
    // In a real application, the backend might cover the gas fees (Meta-transaction)
    // Or return the payload for the frontend to sign and send directly to the network.
    
    res.json({
      voterHash: `0x${voterHash}`,
      message: "Payload generated successfully. Proceed to sign with Web3 wallet."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
