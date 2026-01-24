const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const metricsRoutes = require('./routes/metrics.js');
const devicesRoutes = require('./routes/devices.js');
const alertsRoutes = require('./routes/alerts.js'); 
const predictionRoutes = require('./routes/predictions.js');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {

});

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});

// Routes
app.use("/api/metrics", metricsRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/devices", devicesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
