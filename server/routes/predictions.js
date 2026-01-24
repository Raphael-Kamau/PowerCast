const express = require('express');
const router = express.Router();
const Metric = require("../models/metrics.js");

router.get("/", async (req, res) => {
  try {
    const metrics = await Metric.find({}).sort({ timestamp: 1 });

    if (metrics.length === 0) {
      return res.json({ message: "No data available" });
    }

    const alpha = 0.3;
    const USD_TO_KES = 128.90;

    // Exponential smoothing
    let smoothedConsumption = metrics[0].totalConsumption;
    let smoothedCost = metrics[0].cost * USD_TO_KES;

    metrics.forEach(m => {
      smoothedConsumption = alpha * m.totalConsumption + (1 - alpha) * smoothedConsumption;
      smoothedCost = alpha * (m.cost * USD_TO_KES) + (1 - alpha) * smoothedCost;
    });

    // Moving average + variance (last 6 hours)
    const windowSize = 6;
    const recent = metrics.slice(-windowSize);
    const meanConsumption = recent.reduce((sum, m) => sum + m.totalConsumption, 0) / windowSize;
    const variance = recent.reduce((sum, m) => sum + Math.pow(m.totalConsumption - meanConsumption, 2), 0) / windowSize;
    const stdDev = Math.sqrt(variance);

    // Detect trend
    const lastConsumption = recent[recent.length - 1].totalConsumption;
    const trend = lastConsumption > meanConsumption ? "rising" : lastConsumption < meanConsumption ? "falling" : "stable";

    // Generate next 7 hourly predictions
    const predictions = Array.from({ length: 7 }, (_, i) => ({
      timestamp: new Date(Date.now() + (i + 1) * 3600000),
      predictedConsumption: Number(smoothedConsumption.toFixed(2)),
      predictedCostKES: Number(smoothedCost.toFixed(2)), // ✅ numeric
      lowerBound: Number((smoothedConsumption - stdDev).toFixed(2)),
      upperBound: Number((smoothedConsumption + stdDev).toFixed(2)),
      trend
    }));

    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
