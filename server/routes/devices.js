const express = require('express');
const router = express.Router();
const Device = require('../models/devices.js');

// Get all devices
router.get("/", async (req, res) => {
    const devices = await Device.find();
    res.json(devices);
});

// POST new device
router.post("/", async (req, res) => {
    const devices = new Device(req.body);
    await device.save();
    res.status(201).json(device);
});

// PUT update device status
router.put("/:id", async (req, res) => {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(device);
});

module.exports = router;

