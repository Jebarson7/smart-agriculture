import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function Dashboard() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://smart-agriculture-backend-g0d9.onrender.com/api/sensors")
      .then(res => {
        console.log("API DATA:", res.data); // 🔍 debug
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // ⏳ Loading UI
  if (loading) {
    return <h3 style={{ textAlign: "center" }}>⏳ Loading data...</h3>;
  }

  // 🚨 No data case
  if (!data || data.length === 0) {
    return <h3 style={{ textAlign: "center" }}>⚠️ No data available</h3>;
  }

  // 📊 Chart Data (SAFE)
  const chartData = {
    labels: data.map((item, index) => `Data ${index + 1}`),
    datasets: [
      {
        label: "Moisture",
        data: data.map(item => Number(item.moisture)),
        borderColor: "#2196f3",
        backgroundColor: "rgba(33,150,243,0.2)",
        tension: 0.4,
        pointRadius: 5
      },
      {
        label: "Temperature",
        data: data.map(item => Number(item.temperature)),
        borderColor: "#f44336",
        backgroundColor: "rgba(244,67,54,0.2)",
        tension: 0.4,
        pointRadius: 5
      }
    ]
  };

  // 📊 Chart Options (IMPROVED)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top"
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>

      <h2>📊 Sensor Dashboard</h2>

      {/* 📈 Chart Section */}
      <div style={{ width: "80%", height: "300px", margin: "auto", marginBottom: "30px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* 📦 Cards */}
      <div className="card-container">
        {data.map((item) => (
          <div className="card" key={item._id}>

            <h3>🌿 Farm Data</h3>

            <p className="value">
              💧 Moisture: <span>{item.moisture}</span>
            </p>

            <p className="value">
              🌡️ Temperature: <span>{item.temperature}°C</span>
            </p>

            {item.moisture < 30 && (
              <p className="alert">
                ⚠️ Low Moisture! Irrigation Needed
              </p>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;