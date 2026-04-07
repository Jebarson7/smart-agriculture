const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Connect MongoDB (we will update later)
mongoose.connect("mongodb+srv://admin:admin123@cluster0.zghtwbo.mongodb.net/agriculture?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const sensorRoutes = require("./routes/sensorRoutes");
app.use("/api/sensors", sensorRoutes);

const irrigationRoutes = require("./routes/irrigationRoutes");
app.use("/api/irrigation", irrigationRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});