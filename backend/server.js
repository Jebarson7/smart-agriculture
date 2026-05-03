const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://smart-agriculture-theta.vercel.app"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Agriculture Backend is Running 🌱");
});

// 🔗 Connect MongoDB (we will update later)
mongoose.connect("mongodb+srv://admin:admin123@cluster0.zghtwbo.mongodb.net/agriculture?retryWrites=true&w=majority")
.then(() => {
  console.log("MongoDB Connected");

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });

})
.catch(err => console.log(err));

// Routes
const sensorRoutes = require("./routes/sensorRoutes");
app.use("/api/sensors", sensorRoutes);

const irrigationRoutes = require("./routes/irrigationRoutes");
app.use("/api/irrigation", irrigationRoutes);

// Start server
