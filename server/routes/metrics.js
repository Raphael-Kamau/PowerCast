const express = require('express');
const router = express.Router();
const Metric = require('../models/metrics.js');

// Get latest metrics
router.get("/", async (req, res) => {
  try {
    // Sort by most recent and limit to 10
    const metrics = await Metric.find({}).sort({ timestamp: -1 }).limit(10);
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new metric
router.post("/", async (req, res) => {
  try {
    const metric = new Metric(req.body);
    await metric.save();
    res.status(201).json(metric);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
