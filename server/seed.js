const mongoose = require("mongoose");
const Metric = require("./models/metrics.js");
const Device = require("./models/devices.js");
const Alert = require("./models/alerts.js");
const dotenv = require("dotenv");
dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // Clear existing data
    await Metric.deleteMany({});
    await Device.deleteMany({});
    await Alert.deleteMany({});

    // Seed Metrics (last 24 hours, hourly)
    const metrics = [];
    for (let i = 0; i < 24; i++) {
      metrics.push({
        timestamp: new Date(Date.now() - i * 3600000),
        totalConsumption: Math.floor(Math.random() * 120) + 40, // 40–160 kWh
        peakLoad: Math.floor(Math.random() * 60) + 15,          // 15–75 kW
        cost: Math.floor(Math.random() * 25) + 10,              // $10–$35
      });
    }
    await Metric.insertMany(metrics);
    console.log("📊 Metrics seeded (24 hours)");

    // Seed Devices (expanded list)
    const devices = [
      { name: "Air Conditioner", consumption: 45, status: "active" },
      { name: "Refrigerator", consumption: 18, status: "active" },
      { name: "Washing Machine", consumption: 25, status: "inactive" },
      { name: "Lighting System", consumption: 12, status: "active" },
      { name: "Computer", consumption: 30, status: "active" },
      { name: "Television", consumption: 20, status: "inactive" },
      { name: "Water Heater", consumption: 50, status: "active" },
      { name: "Microwave Oven", consumption: 10, status: "inactive" },
      { name: "Dishwasher", consumption: 22, status: "active" },
      { name: "Electric Kettle", consumption: 8, status: "inactive" },
    ];
    await Device.insertMany(devices);
    console.log("🔌 Devices seeded (10 devices)");

    // Seed Alerts (expanded list)
    const alerts = [
      { message: "Peak load exceeded 70 kW", severity: "high" },
      { message: "Consumption unusually high compared to weekly average", severity: "medium" },
      { message: "Device 'Television' left on standby", severity: "low" },
      { message: "Water Heater running continuously for 3 hours", severity: "high" },
      { message: "Lighting System usage increased by 20% compared to yesterday", severity: "medium" },
      { message: "Refrigerator door left open for extended period", severity: "low" },
      { message: "Weekly report: overall consumption decreased by 8%", severity: "low" },
    ];
    await Alert.insertMany(alerts);
    console.log("🚨 Alerts seeded (7 alerts)");

    mongoose.connection.close();
    console.log("🌱 Seeding complete, connection closed");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.connection.close();
  }
}

seed();
