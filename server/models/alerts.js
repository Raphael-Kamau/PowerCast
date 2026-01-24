const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    message: String,
    severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
    timestamp: { type: Date, default: Date.now }
});

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;