const express = require("express");
const router = express.Router();

let logs = [];

// POST
router.post("/", (req, res) => {
  logs.push({ ...req.body, time: new Date() });
  res.json({ message: "Irrigation Started" });
});

// GET
router.get("/", (req, res) => {
  res.json(logs);
});

module.exports = router;