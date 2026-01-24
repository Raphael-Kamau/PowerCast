const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: String,
    consumption: Number,
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    lastUpdated: { type: Date, default: Date.now }
});

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;