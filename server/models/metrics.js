const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    totalConsumption: Number,
    peakLoad: Number,
    cost: Number
});

const Metric = mongoose.model("Metric", metricSchema);
module.exports = Metric;