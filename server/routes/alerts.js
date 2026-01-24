const express = require("express");
const router = express.Router();
const Alert = require("../models/alerts.js");

// Create a new alert
router.get("/", async (req, res) => {
        const alerts = await Alert.find({}).sort({ timestamp: -1 }); // Sort by most recent
        res.json(alerts);     
});

// Post a new alert
router.post("/", async(req, res) => {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json(alert);
});

module.exports = router;
