import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function Irrigation() {

  const [message, setMessage] = useState("");

  const startIrrigation = () => {
    axios.post("http://smart-agriculture-backend-g0d9.onrender.com/api/irrigation", {
      status: "ON"
    })
    .then(() => setMessage("✅ Irrigation Started"))
    .catch(() => setMessage("❌ Error"));
  };

  const stopIrrigation = () => {
    axios.post("http://smart-agriculture-backend-g0d9.onrender.com/api/irrigation", {
      status: "OFF"
    })
    .then(() => setMessage("🛑 Irrigation Stopped"))
    .catch(() => setMessage("❌ Error"));
  };

  return (
    <div>
      <h2>💧 Irrigation Control</h2>

      <button className="irrigation-btn" onClick={startIrrigation}>
        ▶️ Start Irrigation
      </button>

      <button className="stop-btn" onClick={stopIrrigation}>
        ⏹️ Stop Irrigation
      </button>

      <p>{message}</p>
    </div>
  );
}

export default Irrigation;