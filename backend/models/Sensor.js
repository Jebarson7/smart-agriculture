const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  moisture: Number,
  temperature: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Sensor", sensorSchema);