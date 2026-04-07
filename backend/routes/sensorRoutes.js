const express = require("express");
const router = express.Router();
const Sensor = require("../models/Sensor");

// POST sensor data
router.post("/", async (req, res) => {
  try {
    const data = new Sensor(req.body);
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET sensor data
router.get("/", async (req, res) => {
  try {
    const data = await Sensor.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;