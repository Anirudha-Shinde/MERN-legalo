// Location: mern/server/routes/obligations.js

const express = require('express');
const router = express.Router();
const Obligation = require('../models/obligation');

// GET all obligations
router.get('/', async (req, res) => {
  try {
    const obligations = await Obligation.find().sort({ createdAt: -1 });
    res.json(obligations);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// GET single obligation
router.get('/:id', async (req, res) => {
  try {
    const obligation = await Obligation.findById(req.params.id);
    if (!obligation) return res.status(404).json({ message: 'Obligation not found' });
    res.json(obligation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE new obligation
router.post('/', async (req, res) => {
  const obligation = new Obligation({
    obligationId: req.body.obligationId,
    title: req.body.title,
    category: req.body.category,
    appliesIf: req.body.appliesIf,
    riskLevel: req.body.riskLevel,
    completionDefinition: req.body.completionDefinition,
    isActive: req.body.isActive
  });

  try {
    const newObligation = await obligation.save();
    res.status(201).json(newObligation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE obligation
router.put('/:id', async (req, res) => {
  try {
    const updatedObligation = await Obligation.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Return the updated document
    );
    res.json(updatedObligation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE obligation
router.delete('/:id', async (req, res) => {
  try {
    await Obligation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Obligation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;